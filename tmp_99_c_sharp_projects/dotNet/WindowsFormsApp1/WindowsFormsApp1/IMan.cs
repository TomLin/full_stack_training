using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{
    public interface IMan
    {
        // 請在 Manager Class 實作此介面 interface
        // 以下方法的功能： 顯示職稱，並可以切換多國語言，回傳值是植物名稱的字串，
        // 有兩個參數，一個是 MyEnum.Man 的列舉代號，一個是多國語言的代號(字串), 
        // 多國語言代號，例：tw, jp, cn, us, kr(koera)

        string 顯示職務名稱(MyEnum.Man my列舉代號, string lang);
    }
}
