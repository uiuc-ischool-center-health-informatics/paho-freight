# Data Dictionary (for Final_PAHO_Data.csv)
| Column Name            | Data Type        | Description |
|------------------------|------------------|-------------|
| `Freight`              | `float64`        | (**Response**) **Cost** of freight charges for the shipment. |
| `Country`              | `object`         | The **destination** country receiving the shipment. |
| `PurchaseOrderDate`    | `datetime64[ns]` | The **date** the purchase order was placed, in MM/DD/YYYY format. |
| `Type`                 | `object`         | Product **category**, such as vaccine, syringe, or immunoglobulin. |
| `Product`              | `object`          | 4-digit product code. The first two digits indicate the product type, and the last two indicate the version. |
| `Variant`              | `object`          | 2-digit code indicating dose count or presentation (e.g., vial or prefilled syringe). |
| `SupplierCountry`      | `object`         | The **origin** country from which the product was supplied. |
| `Quantity`             | `int64`          | Number of **units** included in the shipment. |
| `Value`                | `float64`        | Total **monetary value** of the shipment. |
| `Air`                  | `float64`        | AIR **freight index** value at the time of shipment. |
| `BDI`                  | `int64`          | **Baltic Dry Index** (BDI) at the time of shipment. |
| `Doses`                | `int64`          | Number of **doses** per vial. |
| `Distance`             | `float64`        | **Approximate distance** the shipment traveled. Calculated by the distance between the capital cities of the supplier and receiving country |
| `Volume`               | `float64`        | Total shipment volume in cubic centimeters (**cm³**). |
| `StorageCondition`     | `object`         | Indicates storage condition **temperature**-wise. |
| `Openness`             | `float64`        | A score indicating the "**openness**" of the receiving country. |
| `Weight`               | `float64`        | Weight per unit (vial, syringe, etc.), provided by Javier, in **grams**. |
| `TotalShipmentWeight`  | `float64`        | Total weight of the entire shipment, calculated as `Weight * Quantity`, in **grams**. |

The volume, weight, and storage condition variables in this data set combine preedicted and actual values. 
