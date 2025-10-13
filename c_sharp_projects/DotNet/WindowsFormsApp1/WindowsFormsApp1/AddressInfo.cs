using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public struct AddressInfo
{
    public string 縣市;
    public string 行政區;
    public string 街道門牌;
    public int 郵遞區號 { get; set; }

    public AddressInfo(string city, string area, string street, int postCode)
    {
        縣市 = city;
        行政區 = area;
        街道門牌 = street;
        郵遞區號 = postCode;
    }

    public string 輸出完整地址無郵遞區號()
    {
        return $"{縣市}{行政區}{街道門牌}";
    }

    public string 輸出完整地址有郵遞區號()
    {
        return $"{郵遞區號}{縣市}{行政區}{街道門牌}";
    }

}