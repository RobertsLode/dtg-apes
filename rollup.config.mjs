import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss'
import image from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';

import nested from 'postcss-nested'
import simplevars from 'postcss-simple-vars'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

export default [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
            },
            {
                file: 'dist/index.es.js',
                format: 'esm',
                exports: 'named',
            }
        ],
        onwarn(warning, warn) {
            if (warning.code === 'THIS_IS_UNDEFINED') return;
            warn(warning);
        },
        plugins: [
            postcss({
                extensions: ['.css', '.scss'],
                plugins: [
                    simplevars(),
                    nested(),
                    cssnext({ warnForDuplicates: false }),
                    cssnano()],
            }),
            // scss({
            //     extensions: ['.css', '.scss'],
            // }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
            }),
            external(),
            resolve(),
            terser(),
            image(),
            json()
            //! malcena
            //     new webpack.IgnorePlugin({
            //         resourceRegExp: /^\.\/locale$/,
            //         contextRegExp: /moment$/,
            //     }),
        ],
        external: ['prop-types', 'moment', 'classnames']
        // module: {
        //     rules: [
        //         {
        //             test: /\.(js|jsx)$/,
        //             exclude: /(dist|node_modules|bower_components)/,
        //             use: { loader: 'babel-loader' },
        //         },
        //         {
        //             test: /\.(sa|sc|c)ss$/,
        //             use: ['style-loader', 'css-loader', 'sass-loader'],
        //         },
        //     ],
        // },
    }
]