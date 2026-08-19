/* AUTO-GENERATED từ kendo-data-query 1.6.0 (oracle) — KHÔNG sửa tay.
 * Regenerate: node scripts/generate-kendo-fixtures.js (xem git history). */
import { CompositeFilterDescriptor, SortDescriptor, State } from '../types';

export interface KendoSortFixture {
    name: string;
    data: any[];
    sort: SortDescriptor[];
    expected: any[];
}

export interface KendoFilterFixture {
    name: string;
    data: any[];
    filter: CompositeFilterDescriptor;
    expected: any[];
}

export interface KendoPagingFixture {
    name: string;
    data: any[];
    state: State;
    expected: { data: any[]; total: number };
}

export const kendoExpected: {
    sorting: KendoSortFixture[];
    filtering: KendoFilterFixture[];
    paging: KendoPagingFixture[];
} = {
  "sorting": [
    {
      "name": "asc theo ProductName (dir asc)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "ProductName",
          "dir": "asc"
        }
      ],
      "expected": [
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        }
      ]
    },
    {
      "name": "desc theo ProductName",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "ProductName",
          "dir": "desc"
        }
      ],
      "expected": [
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "nested field Category.Name (dir asc)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "Category.Name",
          "dir": "asc"
        }
      ],
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "multi-key UnitPrice asc + ProductID desc (đủ dir)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "UnitPrice",
          "dir": "asc"
        },
        {
          "field": "ProductID",
          "dir": "desc"
        }
      ],
      "expected": [
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        }
      ]
    },
    {
      "name": "null Qty first (dir asc)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "Qty",
          "dir": "asc"
        }
      ],
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        }
      ]
    },
    {
      "name": "boolean Discontinued desc",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "Discontinued",
          "dir": "desc"
        }
      ],
      "expected": [
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "ProductName asc + UnitPrice desc (đủ dir)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "ProductName",
          "dir": "asc"
        },
        {
          "field": "UnitPrice",
          "dir": "desc"
        }
      ],
      "expected": [
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        }
      ]
    },
    {
      "name": "desc bỏ qua descriptor không có dir",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [
        {
          "field": "UnitPrice"
        },
        {
          "field": "ProductID",
          "dir": "desc"
        }
      ],
      "expected": [
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "empty sort -> giữ thứ tự",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "sort": [],
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    }
  ],
  "filtering": [
    {
      "name": "eq string (Beverages)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Category.Name",
            "operator": "eq",
            "value": "Beverages"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        }
      ]
    },
    {
      "name": "eq số (UnitPrice 18)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "UnitPrice",
            "operator": "eq",
            "value": 18
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "neq ProductName Chai",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "neq",
            "value": "Chai"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "contains \"Chef\"",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "contains",
            "value": "Chef"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        }
      ]
    },
    {
      "name": "doesnotcontain \"Chef\"",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "doesnotcontain",
            "value": "Chef"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "startswith \"Ch\"",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "startswith",
            "value": "Ch"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        }
      ]
    },
    {
      "name": "doesnotstartwith \"Ch\"",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "doesnotstartwith",
            "value": "Ch"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "endswith \"Mix\"",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "endswith",
            "value": "Mix"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        }
      ]
    },
    {
      "name": "doesnotendwith \"Mix\"",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "doesnotendwith",
            "value": "Mix"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "isnull Qty",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Qty",
            "operator": "isnull"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "isnotnull Qty",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Qty",
            "operator": "isnotnull"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "isempty Qty",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Qty",
            "operator": "isempty"
          }
        ]
      },
      "expected": []
    },
    {
      "name": "isnotempty Qty",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Qty",
            "operator": "isnotempty"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "lt UnitPrice 20",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "UnitPrice",
            "operator": "lt",
            "value": 20
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "lte UnitPrice 18",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "UnitPrice",
            "operator": "lte",
            "value": 18
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "gt UnitPrice 40",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "UnitPrice",
            "operator": "gt",
            "value": 40
          }
        ]
      },
      "expected": [
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        }
      ]
    },
    {
      "name": "gte UnitPrice 40",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "UnitPrice",
            "operator": "gte",
            "value": 40
          }
        ]
      },
      "expected": [
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        }
      ]
    },
    {
      "name": "nested field filter",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Category.Name",
            "operator": "eq",
            "value": "Seafood"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "and 2 conditions",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Category.Name",
            "operator": "eq",
            "value": "Beverages"
          },
          {
            "field": "UnitPrice",
            "operator": "gt",
            "value": 15
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        }
      ]
    },
    {
      "name": "or 2 conditions",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "or",
        "filters": [
          {
            "field": "Category.Name",
            "operator": "eq",
            "value": "Seafood"
          },
          {
            "field": "UnitPrice",
            "operator": "gte",
            "value": 40
          }
        ]
      },
      "expected": [
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ]
    },
    {
      "name": "or với and lồng nhau",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "or",
        "filters": [
          {
            "logic": "and",
            "filters": [
              {
                "field": "Category.Name",
                "operator": "eq",
                "value": "Beverages"
              },
              {
                "field": "Qty",
                "operator": "isnotnull"
              }
            ]
          },
          {
            "field": "ProductID",
            "operator": "eq",
            "value": 8
          }
        ]
      },
      "expected": [
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "contains ignoreCase:false \"chef\" (sensitive)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "contains",
            "value": "chef",
            "ignoreCase": false
          }
        ]
      },
      "expected": []
    },
    {
      "name": "eq lowercase term (insensitive default)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "ProductName",
            "operator": "eq",
            "value": "chai"
          }
        ]
      },
      "expected": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        }
      ]
    },
    {
      "name": "eq null vs missing field",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "filter": {
        "logic": "and",
        "filters": [
          {
            "field": "Missing",
            "operator": "eq",
            "value": null
          }
        ]
      },
      "expected": []
    }
  ],
  "paging": [
    {
      "name": "trang 1 (0,5)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 0,
        "take": 5
      },
      "expected": {
        "data": [
          {
            "ProductID": 1,
            "ProductName": "Chai",
            "UnitPrice": 18,
            "Discontinued": false,
            "Category": {
              "Name": "Beverages"
            },
            "Qty": null
          },
          {
            "ProductID": 2,
            "ProductName": "Chang",
            "UnitPrice": 19,
            "Discontinued": true,
            "Category": {
              "Name": "Beverages"
            },
            "Qty": 5
          },
          {
            "ProductID": 3,
            "ProductName": "Aniseed Syrup",
            "UnitPrice": 10,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "UnitPrice": 22,
            "Discontinued": true,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 10
          },
          {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "UnitPrice": 21.35,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 0
          }
        ],
        "total": 10
      }
    },
    {
      "name": "trang 2 (5,5)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 5,
        "take": 5
      },
      "expected": {
        "data": [
          {
            "ProductID": 6,
            "ProductName": "Grandma's Boysenberry Spread",
            "UnitPrice": 25,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 3
          },
          {
            "ProductID": 7,
            "ProductName": "Uncle Bob's Organic Dried Pears",
            "UnitPrice": 30,
            "Discontinued": false,
            "Category": {
              "Name": "Produce"
            },
            "Qty": 0
          },
          {
            "ProductID": 8,
            "ProductName": "Northwoods Cranberry Sauce",
            "UnitPrice": 40,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 9,
            "ProductName": "Mishi Kobe Niku",
            "UnitPrice": 97,
            "Discontinued": true,
            "Category": {
              "Name": "Meat/Poultry"
            },
            "Qty": 2
          },
          {
            "ProductID": 10,
            "ProductName": "Ikura",
            "UnitPrice": 31,
            "Discontinued": false,
            "Category": {
              "Name": "Seafood"
            },
            "Qty": 1
          }
        ],
        "total": 10
      }
    },
    {
      "name": "slice giữa (2,3)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 2,
        "take": 3
      },
      "expected": {
        "data": [
          {
            "ProductID": 3,
            "ProductName": "Aniseed Syrup",
            "UnitPrice": 10,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "UnitPrice": 22,
            "Discontinued": true,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 10
          },
          {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "UnitPrice": 21.35,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 0
          }
        ],
        "total": 10
      }
    },
    {
      "name": "take thừa (8,10)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 8,
        "take": 10
      },
      "expected": {
        "data": [
          {
            "ProductID": 9,
            "ProductName": "Mishi Kobe Niku",
            "UnitPrice": 97,
            "Discontinued": true,
            "Category": {
              "Name": "Meat/Poultry"
            },
            "Qty": 2
          },
          {
            "ProductID": 10,
            "ProductName": "Ikura",
            "UnitPrice": 31,
            "Discontinued": false,
            "Category": {
              "Name": "Seafood"
            },
            "Qty": 1
          }
        ],
        "total": 10
      }
    },
    {
      "name": "take=0 (không page)",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 3,
        "take": 0
      },
      "expected": {
        "data": [
          {
            "ProductID": 1,
            "ProductName": "Chai",
            "UnitPrice": 18,
            "Discontinued": false,
            "Category": {
              "Name": "Beverages"
            },
            "Qty": null
          },
          {
            "ProductID": 2,
            "ProductName": "Chang",
            "UnitPrice": 19,
            "Discontinued": true,
            "Category": {
              "Name": "Beverages"
            },
            "Qty": 5
          },
          {
            "ProductID": 3,
            "ProductName": "Aniseed Syrup",
            "UnitPrice": 10,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "UnitPrice": 22,
            "Discontinued": true,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 10
          },
          {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "UnitPrice": 21.35,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 0
          },
          {
            "ProductID": 6,
            "ProductName": "Grandma's Boysenberry Spread",
            "UnitPrice": 25,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 3
          },
          {
            "ProductID": 7,
            "ProductName": "Uncle Bob's Organic Dried Pears",
            "UnitPrice": 30,
            "Discontinued": false,
            "Category": {
              "Name": "Produce"
            },
            "Qty": 0
          },
          {
            "ProductID": 8,
            "ProductName": "Northwoods Cranberry Sauce",
            "UnitPrice": 40,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 9,
            "ProductName": "Mishi Kobe Niku",
            "UnitPrice": 97,
            "Discontinued": true,
            "Category": {
              "Name": "Meat/Poultry"
            },
            "Qty": 2
          },
          {
            "ProductID": 10,
            "ProductName": "Ikura",
            "UnitPrice": 31,
            "Discontinued": false,
            "Category": {
              "Name": "Seafood"
            },
            "Qty": 1
          }
        ],
        "total": 10
      }
    },
    {
      "name": "sort + page",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 0,
        "take": 4,
        "sort": [
          {
            "field": "ProductID",
            "dir": "desc"
          }
        ]
      },
      "expected": {
        "data": [
          {
            "ProductID": 10,
            "ProductName": "Ikura",
            "UnitPrice": 31,
            "Discontinued": false,
            "Category": {
              "Name": "Seafood"
            },
            "Qty": 1
          },
          {
            "ProductID": 9,
            "ProductName": "Mishi Kobe Niku",
            "UnitPrice": 97,
            "Discontinued": true,
            "Category": {
              "Name": "Meat/Poultry"
            },
            "Qty": 2
          },
          {
            "ProductID": 8,
            "ProductName": "Northwoods Cranberry Sauce",
            "UnitPrice": 40,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 7,
            "ProductName": "Uncle Bob's Organic Dried Pears",
            "UnitPrice": 30,
            "Discontinued": false,
            "Category": {
              "Name": "Produce"
            },
            "Qty": 0
          }
        ],
        "total": 10
      }
    },
    {
      "name": "filter + page",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 1,
        "take": 3,
        "filter": {
          "logic": "and",
          "filters": [
            {
              "field": "Category.Name",
              "operator": "eq",
              "value": "Condiments"
            }
          ]
        }
      },
      "expected": {
        "data": [
          {
            "ProductID": 4,
            "ProductName": "Chef Anton's Cajun Seasoning",
            "UnitPrice": 22,
            "Discontinued": true,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 10
          },
          {
            "ProductID": 5,
            "ProductName": "Chef Anton's Gumbo Mix",
            "UnitPrice": 21.35,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 0
          },
          {
            "ProductID": 6,
            "ProductName": "Grandma's Boysenberry Spread",
            "UnitPrice": 25,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": 3
          }
        ],
        "total": 5
      }
    },
    {
      "name": "sort + filter + page",
      "data": [
        {
          "ProductID": 1,
          "ProductName": "Chai",
          "UnitPrice": 18,
          "Discontinued": false,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": null
        },
        {
          "ProductID": 2,
          "ProductName": "Chang",
          "UnitPrice": 19,
          "Discontinued": true,
          "Category": {
            "Name": "Beverages"
          },
          "Qty": 5
        },
        {
          "ProductID": 3,
          "ProductName": "Aniseed Syrup",
          "UnitPrice": 10,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 4,
          "ProductName": "Chef Anton's Cajun Seasoning",
          "UnitPrice": 22,
          "Discontinued": true,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 10
        },
        {
          "ProductID": 5,
          "ProductName": "Chef Anton's Gumbo Mix",
          "UnitPrice": 21.35,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 0
        },
        {
          "ProductID": 6,
          "ProductName": "Grandma's Boysenberry Spread",
          "UnitPrice": 25,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": 3
        },
        {
          "ProductID": 7,
          "ProductName": "Uncle Bob's Organic Dried Pears",
          "UnitPrice": 30,
          "Discontinued": false,
          "Category": {
            "Name": "Produce"
          },
          "Qty": 0
        },
        {
          "ProductID": 8,
          "ProductName": "Northwoods Cranberry Sauce",
          "UnitPrice": 40,
          "Discontinued": false,
          "Category": {
            "Name": "Condiments"
          },
          "Qty": null
        },
        {
          "ProductID": 9,
          "ProductName": "Mishi Kobe Niku",
          "UnitPrice": 97,
          "Discontinued": true,
          "Category": {
            "Name": "Meat/Poultry"
          },
          "Qty": 2
        },
        {
          "ProductID": 10,
          "ProductName": "Ikura",
          "UnitPrice": 31,
          "Discontinued": false,
          "Category": {
            "Name": "Seafood"
          },
          "Qty": 1
        }
      ],
      "state": {
        "skip": 0,
        "take": 3,
        "sort": [
          {
            "field": "UnitPrice",
            "dir": "desc"
          }
        ],
        "filter": {
          "logic": "and",
          "filters": [
            {
              "field": "Discontinued",
              "operator": "eq",
              "value": false
            }
          ]
        }
      },
      "expected": {
        "data": [
          {
            "ProductID": 8,
            "ProductName": "Northwoods Cranberry Sauce",
            "UnitPrice": 40,
            "Discontinued": false,
            "Category": {
              "Name": "Condiments"
            },
            "Qty": null
          },
          {
            "ProductID": 10,
            "ProductName": "Ikura",
            "UnitPrice": 31,
            "Discontinued": false,
            "Category": {
              "Name": "Seafood"
            },
            "Qty": 1
          },
          {
            "ProductID": 7,
            "ProductName": "Uncle Bob's Organic Dried Pears",
            "UnitPrice": 30,
            "Discontinued": false,
            "Category": {
              "Name": "Produce"
            },
            "Qty": 0
          }
        ],
        "total": 7
      }
    }
  ]
};
