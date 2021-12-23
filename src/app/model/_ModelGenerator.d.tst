${
    Template(Settings settings)
    {
        settings.OutputExtension = ".d.ts";
    }

    string TypeConverter(Property prop)
    {  
        if(prop.Type.Name == "ObjectId")
            return "string";
        else if(prop.Type.IsEnum)
            return "number";
        return prop.Type.Name;  
    }
    string JsonName(Property property)
    {
        var attribute = property.Attributes.FirstOrDefault(a => a.Name == "JsonProperty");
        if (attribute != null)
        {
            var value = attribute.Value;
            var start = value.IndexOf("\"");
            if (start >= 0)
            {
                value = value.Substring(start + 1);
                var end = value.IndexOf("\"");
                value = value.Substring(0, end); 
            }
            return value;
        }
        return property.Name;
    }
    string LoudName(Class c) 
    {
        return c.Name.ToUpperInvariant();
    }
}

declare namespace models {$Classes(c => (c.FullName.StartsWith("Model") && c.FullName.Contains("Constant")==false)
                                        || c.FullName.StartsWith("Shared.Common.Models"))[
    export class $Name$TypeParameters {$BaseClass[$BaseClass[$Properties[
        public $Name: $TypeConverter;]]$Properties[
        public $Name: $TypeConverter;]]$Properties[
        public $Name: $TypeConverter;]
    }]
}

