import React from 'react';
import { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { ClearButton } from '../ClearButton/ClearButton.jsx';
import MasterSelect from './components/MasterSelect.jsx';
import Items from './components/Items.jsx';
import './styles.scss';
import '../../../../styles/main.scss';

const DEFAULT_ITEM_RENDER_COUNT = 50;

const propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    title: PropTypes.string,
    isImportant: PropTypes.bool,
    isBackground: PropTypes.bool,
    sort: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  })).isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  className: PropTypes.string,
  language: PropTypes.string,
  debounce: PropTypes.number,
  autoComplete: PropTypes.string,
  multiselect: PropTypes.bool,
  toSort: PropTypes.bool,
  multiselectPreview: PropTypes.oneOfType([
    PropTypes.oneOf([
      'default',
      'value',
    ]),
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  disableDeselect: PropTypes.bool,
};

propTypes.list.children = PropTypes.arrayOf(PropTypes.shape());

const defaultProps = {
  label: '',
  value: '',
  className: '',
  language: '',
  debounce: 500,
  autoComplete: 'off',
  multiselect: false,
  multiselectPreview: 'default',
  required: false,
  disabled: false,
  valid: null,
  disableDeselect: false,
  toSort: false,
};

class Autocomplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputRef: createRef(),
      containerRef: createRef(),
      areAllSelected: false,
      items: [],
      renderedItems: DEFAULT_ITEM_RENDER_COUNT,
      visibleItemsCount: 0,
      filter: '',
      filterTimeout: null,
      showContainer: false,
      isValid: false,
      isClearButtonVisible: false,
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleScrollView = this.handleScrollView.bind(this);
    this.valueComparer = this.valueComparer.bind(this);
  }

  static isImportantComparer(a, b) {
    if (a.isImportant === b.isImportant) return 0;

    if (a.isImportant) return -1;

    return 1;
  }

  static isSelectedComparer(a, b) {
    if (a.isSelected === b.isSelected) return 0;

    if (a.isSelected) return -1;

    return 1;
  }

  static isVisibleComparer(a, b) {
    if (a.isVisible === b.isVisible) return 0;

    if (a.isVisible) return -1;

    return 1;
  }

  static isBackgroundComparer(a, b) {
    if (a.isBackground === b.isBackground) return 0;

    if (a.isBackground) return 1;

    return -1;
  }

  static customComparer(a, b) {
    if (a.sort && b.sort) {
      if (typeof a.sort === 'string' && typeof b.sort === 'string') {
        return (
          a.sort.localeCompare(b.sort)
        );
      }

      return a.sort - b.sort;
    }

    return 0;
  }

  static extractSelected(items = []) {
    return items.flatMap((item) => {
      const { children, isSelected } = item;

      return isSelected
        ? [item, ...Autocomplete.extractSelected(children)]
        : Autocomplete.extractSelected(children);
    });
  }

  static getVisibleItemsCount(items = []) {
    return items.reduce((acc, item) => {
      const { children, isVisible } = item;

      const countFromChildren = Array.isArray(children)
        ? this.getVisibleItemsCount(children)
        : 0;

      const currentCount = isVisible
        ? acc + 1 + countFromChildren
        : acc + countFromChildren;

      return currentCount;
    }, 0);
  }

  static updateItemIsSelected(items, isSelected) {
    return items.map((item) => {
      const { children } = item;

      const updatedItem = {
        ...item,
        isSelected,
      };

      if (children) {
        updatedItem.children = Autocomplete.updateItemIsSelected(children, isSelected);
      }

      return updatedItem;
    });
  }

  static updateItemsIsVisible(item) {
    const { isSelected, isBackground } = item;

    const isVisible = isBackground
      ? !!isSelected
      : true;

    return { ...item, isVisible };
  }

  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate(prevProps) {
    const {
      value: prevValue,
      name: prevName,
      list: prevList,
      valid: prevValid,
      disabled: prevDisabled,
      language: prevLanguage,
      required: prevRequired,
    } = prevProps;

    const {
      value: currValue,
      name: currName,
      list: currList,
      valid: currValid,
      disabled: currDisabled,
      language: currLanguage,
      required: currRequired,
    } = this.props;

    if (JSON.stringify(prevValue) !== JSON.stringify(currValue)
      || prevName !== currName
      || JSON.stringify(prevList) !== JSON.stringify(currList)
      || prevValid !== currValid
      || prevDisabled !== currDisabled
      || prevLanguage !== currLanguage
      || prevRequired !== currRequired
    ) {
      this.initialize();
    }
  }

  valueComparer(a, b) {
    if(this.props.toSort) {
    return a.value.localeCompare(b.value);
  }
}


  // with debounce
  handleFilter(e) {
    const { debounce } = this.props;
    const { filterTimeout } = this.state;
    const { name, value } = e.target;

    clearTimeout(filterTimeout);

    const newFilterTimeout = setTimeout(() => {
      this.filterItems();
    }, debounce);

    this.setState({
      [name]: value,
      filterTimeout: newFilterTimeout,
    });
  }

  handleSelect(e) {
    const { items } = this.state;
    const { multiselect, disableDeselect } = this.props;
    const { name, value } = e.target;
    const valueAsKeys = value.split('.');

    function updateMultiselect(arr, keys) {
      const [key, ...remainingKeys] = keys;
      const index = arr.findIndex((item) => item.key === key);
      const newItems = arr[index].children;

      if (index !== -1 && remainingKeys.length && newItems) {
        updateMultiselect(newItems, remainingKeys);
      } else if (index !== -1) {
        const item = arr[index];
        const { isSelected } = item;

        // Updating items by reference
        item.isSelected = !isSelected;
      }
    }

    function updateSingleSelect(arr, keys) {
      const selectedKey = keys[keys.length - 1];

      return arr.map((item) => {
        const { key, isSelected, children } = item;

        const updatedIsSelected = isSelected && disableDeselect ? true : !isSelected;

        const updatedItem = key === selectedKey
          ? {
            ...item,
            isSelected: updatedIsSelected,
          }
          : {
            ...item,
            isSelected: false,
          };

        if (children) {
          updatedItem.children = updateSingleSelect(children, keys);
        }

        return updatedItem;
      });
    }

    if (multiselect) {
      if (name === 'masterSelect') {
        this.setState({
          areAllSelected: true,
          items: Autocomplete.updateItemIsSelected(items, true),
        });
      } else {
        updateMultiselect(items, valueAsKeys);

        this.setState({ items });
      }
    } else {
      const updatedItems = updateSingleSelect(items, valueAsKeys);

      // Resetting filter to avoid repeat call of handleSelect() due to applyFilter()
      this.setState({ items: updatedItems, filter: '' }, () => {
        this.updateParent(false);
      });
    }

    this.updateClearButtonVisibility();
  }

  handleClear(e) {
    e.stopPropagation();

    const { items } = this.state;

    this.setState({
      items: Autocomplete.updateItemIsSelected(items, false),
    }, () => this.updateParent(false));
  }

  handleFocus(e) {
    const { items, showContainer } = this.state;
    const { name } = e.target;

    if (name === 'filter' && !showContainer) {
      const refreshedItems = items.map((item) => Autocomplete.updateItemsIsVisible(item))
        .sort(this.valueComparer)
        .sort(Autocomplete.isImportantComparer)
        .sort(Autocomplete.customComparer)
        .sort(Autocomplete.isBackgroundComparer)
        .sort(Autocomplete.isSelectedComparer);

      this.setState({
        items: refreshedItems,
        showContainer: true,
        filter: '',
      });
    }
  }

  handleBlur(e) {
    const { inputRef } = this.state;

    const validClasses = ['autocomplete-item-container', 'autocomplete-item'];
    const { relatedTarget } = e;
    const isValid = relatedTarget
      ? validClasses.some((className) => relatedTarget.classList.contains(className))
      : false;

    if (isValid) {
      inputRef.current.focus();
    } else {
      this.applyFilter();
      this.updateParent(false);
    }
  }

  handleScrollView() {
    const { containerRef } = this.state;
    const { scrollTop } = containerRef.current;

    const sliceSize = DEFAULT_ITEM_RENDER_COUNT;
    const scrollIncrement = (sliceSize / 1.25) * 41;
    const slices = Math.ceil(scrollTop / scrollIncrement) || 1;
    const renderedItems = slices * sliceSize;

    this.setState({ renderedItems });
  }

  updateClearButtonVisibility() {
    const { multiselect, disableDeselect, disabled } = this.props;
    const { items } = this.state;

    const selected = !!Autocomplete.extractSelected(items).length;
    const isClearButtonVisible = selected && (multiselect || !disableDeselect) && !disabled;

    this.setState({ isClearButtonVisible });
  }

  // If a single item matches filter, select it
  applyFilter() {
    const { filter, items } = this.state;

    function getVisibleItemsKeys(arr, parentKey = '') {
      return arr.reduce((acc, item) => {
        const { children, key, isVisible } = item;
        const formattedKey = parentKey ? `${parentKey}.${key}` : key;

        const keysFromChilldren = Array.isArray(children)
          ? getVisibleItemsKeys(children, key)
          : [];

        const currentKeys = isVisible
          ? [...acc, formattedKey, ...keysFromChilldren]
          : [...acc, ...keysFromChilldren];

        return currentKeys;
      }, []);
    }

    const visibleItemKeys = filter.length && getVisibleItemsKeys(items);

    if (visibleItemKeys.length === 1) {
      const selectedItems = Autocomplete.extractSelected(items);
      const selectedItemKey = visibleItemKeys[0].split('.').slice(-1)[0];
      const isAlreadySelected = selectedItems.some((item) => item.key === selectedItemKey);

      if (!isAlreadySelected) {
        const event = {
          target: {
            name: 'applyFilter',
            value: visibleItemKeys[0],
          },
        };

        this.handleSelect(event);
      }
    }
  }

  updateParent(showContainer) {
    const { inputRef, items } = this.state;

    const {
      value: prevValue,
      onChange,
      name,
      multiselect,
      valid,
    } = this.props;

    const selectedItems = Autocomplete.extractSelected(items);
    const isValid = valid === null ? !!selectedItems.length : valid;
    const selectedKeys = selectedItems.map((item) => item.key);
    const value = multiselect ? selectedKeys : selectedKeys?.[0] || '';
    const isValueDifferent = JSON.stringify(prevValue) !== JSON.stringify(value);

    this.setState({ showContainer, isValid }, () => {
      if (isValueDifferent) onChange({ target: { name, value } });

      this.renderSelectedPreview();
      inputRef.current.blur();
    });
  }

  filterItems() {
    const { items, filter } = this.state;

    const lowerCaseFilter = filter.toLowerCase();

    function updateVisible(arr = []) {
      return arr.map((item) => {
        const { value, children } = item;
        const lowerCaseItem = value.toLowerCase();

        const updatedChildren = updateVisible(children);
        const isVisible = lowerCaseItem.includes(lowerCaseFilter);
        const updatedItem = { ...item, isVisible };

        if (children) updatedItem.children = updatedChildren;

        return updatedItem;
      })
        .sort(this.valueComparer)
        .sort(Autocomplete.isVisibleComparer)
        .sort(Autocomplete.customComparer);
    }

    const updatedItems = updateVisible(items);
    const visibleItemsCount = Autocomplete.getVisibleItemsCount(updatedItems);

    this.setState({ items: updatedItems, visibleItemsCount }, this.handleScrollView);
  }

  initialize() {
    const {
      value, list, valid, i18n, language,
    } = this.props;
    const { showContainer } = this.state;

    i18n.changeLanguage(language);

    let isSomeSelected = false;
    let areAllSelected = true;

    function formatItems(items = []) {
      return items.reduce((acc, item) => {
        const { children } = item;

        const isSelected = Array.isArray(value)
          ? value.some((key) => key === item.key)
          : value === item.key;

        if (isSelected) isSomeSelected = true;
        if (!isSelected) areAllSelected = false;

        const updatedItem = Autocomplete.updateItemsIsVisible({
          ...item,
          isSelected,
        });

        delete updatedItem.children;

        const hasChildren = children && children.length;

        if (hasChildren) {
          const formattedChildren = formatItems(children);
          const childrenItems = formattedChildren;

          updatedItem.children = childrenItems;
        }

        return [...acc, updatedItem];
      }, []);
    }

    const items = formatItems(list);
    const visibleItemsCount = Autocomplete.getVisibleItemsCount(items);

    items.sort(this.valueComparer)
      .sort(Autocomplete.isImportantComparer)
      .sort(Autocomplete.customComparer);

    const isValid = valid === null
      ? (Array.isArray(value) || typeof value === 'string') && !!value.length
      : valid;

    this.setState({
      items, visibleItemsCount, isValid, areAllSelected,
    }, () => {
      this.renderSelectedPreview();
      this.updateClearButtonVisibility();
      if (!isSomeSelected) this.updateParent(showContainer);
    });
  }

  renderSelectedPreview() {
    const { items, showContainer } = this.state;

    if (!showContainer) {
      const { t, multiselect, multiselectPreview } = this.props;
      const selectedItems = Autocomplete.extractSelected(items);

      let value = selectedItems?.[0]?.value || '';
      const filter = (() => {
        if (multiselect) {
          const isNumericalMatch = typeof multiselectPreview === 'number' && selectedItems.length <= multiselectPreview;

          if (multiselectPreview === 'value' || isNumericalMatch) {
            selectedItems.forEach((each, index) => {
              if (index) {
                value += ` ,${each?.value}`
              }
            })
            return value;
          }

          return t('components.autocomplete.multiselect', { count: selectedItems.length });
        }

        return value;
      })();

      this.setState({ filter });
    }
  }

  render() {
    const {
      inputRef,
      containerRef,
      filter,
      areAllSelected,
      items,
      renderedItems,
      visibleItemsCount,
      showContainer,
      isValid,
      isClearButtonVisible,
    } = this.state;

    const {
      autoComplete,
      label,
      className,
      multiselect,
      required,
      disabled,
    } = this.props;

    function getValidity(validity) {
      if (!required || disabled) return '';

      if (validity) return 'is-valid';

      return 'is-invalid';
    }

    return (
      <div
        onFocus={this.handleFocus}
        className={`autocomplete-component position-relative ${className}`}
      >
        <label className="autocomplete-label position-relative w-100">
          {label}
          <input
            ref={inputRef}
            onChange={this.handleFilter}
            onBlur={this.handleBlur}
            value={filter}
            className={`autocomplete-filter form-control ${getValidity(isValid)}`}
            type="text"
            name="filter"
            autoComplete={autoComplete}
            disabled={disabled}
            data-testid="input"
          />
          <ClearButton
            handler={this.handleClear}
            isVisible={isClearButtonVisible}
          />
        </label>
        <ul
          ref={containerRef}
          onScroll={this.handleScrollView}
          tabIndex="-1"
          type="compact"
          className={`autocomplete-item-container position-absolute list-group list-group-flush overflow-auto rounded-start ${showContainer
            ? 'show'
            : ''
            }`}
        >
          <MasterSelect
            items={items}
            show={showContainer}
            handler={this.handleSelect}
            multiselect={multiselect}
            areAllSelected={areAllSelected}
          />
          <Items
            show={showContainer}
            items={items.slice(0, renderedItems)}
            visibleItemsCount={visibleItemsCount}
            handler={this.handleSelect}
          />
        </ul>
      </div>
    );
  }
}

Autocomplete.propTypes = propTypes;
Autocomplete.defaultProps = defaultProps;

// export default withTranslation()(Autocomplete);

const autoCompleteWithTranslation = withTranslation()(Autocomplete);

export { autoCompleteWithTranslation as Autocomplete }