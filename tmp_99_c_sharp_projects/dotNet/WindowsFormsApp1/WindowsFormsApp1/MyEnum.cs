using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{
    public class MyEnum
    {   // Enum的資料，比較接近靜態常數
        // 部門代號
        public enum Dep
        {
            行政處 = 101, 資訊處 = 102, 業務部 = 103, 研發部 = 104
        }

        // 職稱代號(管理職)
        public enum Man
        {
            董事長 = 10,
            總經理 = 11,
            副總 = 12,
            經理 = 13
        }
    }
}
