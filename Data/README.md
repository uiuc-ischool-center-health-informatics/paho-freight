Summary of data collected and prepared

| Folder | Title | Description |
| --- | --- | --- |
| PAHO_Data | freightdata.csv | International Freight Data from 2022 - 2024 for vaccines, immunoglobins and syringes | 
| PAHO_Data | vaccine-weight-volume.csv | Contributes volume, and shipping specification data for ~1200 of 4200 rows in freightdata.csv |
| PAHO_Data | distances.csv | Provides the distance (in Km) between two countries capitals. Countries are signified using 3 character ISO codes |
| Live_Data | live_data_collection.ipynb | Using FedEx, ShipStation API to populate and test new columns in the PAHO dataset |
| Live_Data | MY US.xlsx | Initial API Data gathered from MyUS calculator for high-shipment countries in South America |
| IBC_Data | FINAL_PAHO_DATA.csv | The final dataset being utilized in our modeling efforts, including the distance column and a country's openness to trade value, aswell as predicted volume, weight, and storage condition |
| IBC_Data | Countryopenness.csv |  The final openness varaible calculated for each country in the PAHO Dataset |
| IBC_Data | PAHO_with_Volume_and_Weight.csv | PAHO data including only the rows with PAHO provided volume, weight, and storage condition. Also includes IBC created distance and openness |
|IBC_Data | Countryopenness.xlsx | Outlines the methods, variables, and calculations utilized when assigning a numeric value to a country's openness to trade |
