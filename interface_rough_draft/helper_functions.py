def parse(value, name):
    float_64 = ["1", "2", "3", "4", "5," "6", "7", "8", "9", "0", "."]

    match name:
        case "Freight_": 
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in float_64):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0

        #todo
        case "Country_":
            return "asdf"
        
        #todo
        case "SupplierCountry_":
            return "asdf" 

        case "PurchaseOrderDate_":
            return value

        case "Type_": 
            '''
            Docstring for most_similar_word
            
            :param value: str 
            :param name: should be vaccine, syringe, or immunoglobulin
            :return: returns one from [vaccine, syringe, immunoglobulin] closest to value
            :rtype: float | Any | Literal['asdf'] | None
            '''

            
            return most_similar_word(value)

        case "Product_": 
            '''
            Docstring for Product_
            
            :param value: str
            :param name: 4-digit code for product
            :return: parses the first 4 numbers found in input
            :rtype: float
            '''
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            returnvalue = ""
            for i in range(len(value)):
                if len(returnvalue) >= 4:
                    break
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0

        case "Variant_": 
            '''
            Docstring for Variant_
            
            :param value: str
            :param name: 2-digit code for dose count or presentation
            :return: parses the first 2 numbers found in input
            :rtype: float
            '''
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            returnvalue = ""
            for i in range(len(value)):
                if len(returnvalue) >= 2:
                    break
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0

        case "Quantity_": 
            '''
            Docstring for Quantity_
            
            :param value: str
            :param name: quantity
            :return: parses all the numbers in the inputted value
            :rtype: float 
            '''
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in object):
                    returnvalue += value[i]
            return float(returnvalue)

        case "Value_": 
            '''
            Docstring for Value_
            
            :param value: str
            :param name: Value_ 
            :return: parses all the numbers in the value of the shipment
            :rtype: float 
            '''
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0

        case "Doses_": 
            '''
            Docstring for Doses_
            
            :param value: str
            :param name: quantity
            :return: parses all the numbers in the inputted count of doses
            :rtype: int 
            '''
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return int(returnvalue)
            return 0.0

        case "Volume_":
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0

        case "StorageCondition_": 
            return value

        case "Weight_": 
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0

        case "TotalShipmentWeight_": 
            object = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
            returnvalue = ""
            for i in range(len(value)):
                if (value[i] in object):
                    returnvalue += value[i]
            if returnvalue:
                return float(returnvalue)
            return 0.0
    
    return ""

def most_similar_word(input):
    input = input.lower()
    vaccine = ["v", "a", "c", "c", "i", "n", "e"]
    syringe = ["s", "y", "r", "i", "n", "g", "e"]
    immunoglobulin = ["i", "m", "m", "u", "n", "o", "g", "l", "o", "b", "u", "l", "i", "n"]

    #test for vaccine similarity
    input_1 = input
    for char in vaccine:
        input_1 = input_1.replace(char, '')
    vaccine_size = len(input_1)

    #test for syringe similarity
    input_2 = input
    for char in syringe:
        input_2 = input_2.replace(char, '')
    syringe_size = len(input_2)

    #test for immunoglobulin similarity
    input_3 = input
    for char in immunoglobulin:
        input_3 = input_3.replace(char, '')
    immuno_size = len(input_3)

    if vaccine_size < syringe_size and vaccine_size < immuno_size:
        return "vaccine"
    elif syringe_size < vaccine_size and syringe_size < immuno_size:
        return "syringe"
    elif immuno_size < vaccine_size and immuno_size < syringe_size:
        return "immunoglobulin"
    elif len(input) > 7:
        return "immunoglobulin"
    else:
        return "SOMEHOW YOU MISTYPED WHATEVER TYPE OF DRUG YOU'RE SHIPPING SO BAD I CAN'T TELL WHAT WORD YOU WERE GOING FOR"


    

    
    