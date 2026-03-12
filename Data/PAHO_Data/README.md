## The structure is as follows:


**UI-POrders.csv**

Country : Country of destination of the purchase

PurchaseOrderDate: When it was requested

SupplierNumber: Unique Supplier ID number

SupplierCountry: Where the product comes from

PAHOCAT: The  unique product identifier – the last two digits indicate the number of doses. The codification is at the end

Quantity: Quantity ordered

ExtendedAmountUSD: Cost of the product in USD
FreightCharges: Cost of the freight

InsuranceCharges: Cost of the insurance

UnitPrice: Cost per dose/unit

**UI-weights.csv**

PahoCat: Unique product identifier

SupplierNumber: Unique Supplier ID number

Weight: Weight of the product in kg

**Freightindex.csv**

Date: Start of the month

Air: Air freight index

BDI : Baltic Dry index – sea freight index

Decay: An index I use to do an exponential decay

 
The codification for doses is as follows

If the last two digits of the PAHOCAT are less or equal to 10, means the number of doses

e.g.  01010210 means a 10 dose vial

01010205 means a 5 dose vial


12 means a 20 dose vial

95 a prefilled siringe (this is for all PAHOCATs starting with 01 or 03

06 are syringes and you may ignore 07 or 08 if there are any.
