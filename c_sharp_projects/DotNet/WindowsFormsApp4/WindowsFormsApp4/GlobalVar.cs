using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace WindowsFormsApp4
{
    public class GlobalVar
    {
        // 購物車的資訊
        public static string 訂購人資料 = "";
        public static bool is外帶 = false;
        public static bool is買購物袋 = false;
        public static List<ArrayList> list訂購品項集合 = new List<ArrayList>();

    }
}
