Welcome to ape package!

For now only one (in-progress) component is present in this package.
<br />
Table component structure: 
<br />
```
      <Table
       data:{
            [
                  {
                        tableSlotTotles: {
                        id: String,
                        names: [
                                    {
                                          name: String
                                    },
                                    ...
                              ]
                        },
                        details: [
                              {
                                    id: String,
                                    names: [
                                          {
                                                name: String
                                          },
                                          ...
                                    ]
                              }     
                        ]
                  },
                  ...
            ]
       }
       tHead={
            [
                  String,
                  ...
            ]
       }
       editClick={(id) => ...}
       deleteClick={(id) => ...}
      />
      ```
      
