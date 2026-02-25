Please use `FINAL_freightdata.csv` as it is the latest dataset with all of the information in the previous datasets. Please note you'll likely have to encode the categorical variables still for modeling



# Data Dictionary (for Final_PAHO_Data.csv)
| Column Name                 | Data Type        | Description |
|----------------------------|------------------|-------------|
| `Freight`                   | `float64`        | (**Response**) Total **cost** of freight charges for the shipment. |
| `Freight rate`              | `float64`        | Freight cost as a **share of shipment value**, computed as `Freight / Value_Total`. *(Feature derived from the response; do **not** use as an input feature when predicting `Freight`.)* |
| `Freight_20_pred`           | `float64`        | Baseline freight estimate assuming a **20% freight rate**, computed as `Value_Total * 0.2`. |
| `Differece 20% from Actual` | `float64`        | **Percent deviation** of the 20% baseline from actual freight, computed as `((Freight - Freight_20_pred) / Freight) * 100`. *(Derived from the response; do **not** use as an input feature when predicting `Freight`.)* |
| `Country`                   | `object`         | The **destination** country receiving the shipment. |
| `SupplierCountry`           | `object`         | The **origin** country from which the product was supplied. |
| `PurchaseOrderDate`         | `datetime64[ns]` | The **date** the purchase order was placed (MM/DD/YYYY parsed to datetime). |
| `Type`                      | `object`         | Product **category** (e.g., vaccine, syringe, immunoglobulin). |
| `Product`                   | `object`         | 4-digit product code: first two digits indicate product type; last two indicate version. |
| `Variant`                   | `object`         | 2-digit code indicating dose count or presentation (e.g., vial vs prefilled syringe). |
| `StorageCondition`          | `object`         | Required **temperature/storage condition** for the product. |
| `Quantity`                  | `int64`          | Number of **units** included in the shipment. |
| `Value_Total`               | `float64`        | Total **monetary value** of the shipment (canonical value field used in feature calculations). |
| `Doses`                     | `int64`          | Number of **doses per vial** (valid mainly for vaccines). A value of 0 likely indicates a non-vaccine product. |
| `Weight`                    | `float64`        | Weight **per unit** (vial, syringe, etc.) in **grams**. |
| `TotalShipmentWeight`       | `float64`        | Total shipment weight in **grams**, computed as `Weight * Quantity`. |
| `Weight_Total`              | `float64`        | Total shipment weight in **grams** (alias of `TotalShipmentWeight` if both exist). |
| `Volume`                    | `float64`        | Volume **per unit** in cubic centimeters (**cm³**) unless otherwise specified. |
| `Volume_Total`              | `float64`        | Total shipment volume in **cm³**, computed as `Volume * Quantity`. |
| `Distance`                  | `float64`        | Approximate **distance traveled** (capital-to-capital) between origin and destination countries. |
| `Air`                       | `float64`        | AIR **freight index** value at the time of shipment. |
| `BDI`                       | `int64`          | **Baltic Dry Index** value at the time of shipment. |
| `Openess_DestCountry`       | `float64`        | Openness score for destination country (created by IBC). |

Summary of data collected and prepared

| Folder | Title | Description |
| --- | --- | --- |
| PAHO_Data | freightdata.csv | International Freight Data from 2022 - 2024 for vaccines, immunoglobulins, and syringes | 
| PAHO_Data | vaccine-weight-volume.csv | Contributes volume, and shipping specification data for ~1200 of 4200 rows in freightdata.csv |
| PAHO_Data | distances.csv | Provides the distance (in km) between the capitals of two countries. Countries are signified using 3-character ISO codes |
| Live_Data | live_data_collection.ipynb | Using FedEx, ShipStation API to populate and test new columns in the PAHO dataset |
| Live_Data | MY US.xlsx | Initial API Data gathered from MyUS calculator for high-shipment countries in South America |
| IBC_Data | FINAL_PAHO_DATA.csv | [OUTDATED, DO NOT USE] The final dataset being utilized in our modeling efforts, including the distance column and a country's openness to trade value, as well as predicted volume, weight, and storage condition |
| IBC_Data | Countryopenness.csv |  The final openness variable calculated for each country in the PAHO Dataset |
| IBC_Data | PAHO_with_Volume_and_Weight.csv | PAHO data including only the rows with PAHO provided volume, weight, and storage condition. Also includes IBC-created distance and openness |
|IBC_Data | Countryopenness.xlsx | Outlines the methods, variables, and calculations utilized when assigning a numeric value to a country's openness to trade |
