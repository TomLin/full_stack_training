using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WindowsFormsApp1
{   // 泛型資料形態，在定義時，不設定data typ，而是在使用時，才代入data type
    // 如果多個泛型data type，可以用T1, T2, ..., Tn 的方式，來使用
    public class PersonInfo<T>
    {
        public T myData; // 未定資料型態的欄位
        public T myData2 { get; set; } // 未定資料型態的屬性

        public void saveData(T inputData, T inputData2)
        {
            myData = inputData;
            myData2 = inputData2;

            // 以下程式無用途(僅提供程式範例怎麼寫) ------
            List<T> myList = new List<T>();
            myList.Add(myData);
            myList.Add(myData2);
            // 以上程式無用途 ------

            switch (Type.GetTypeCode(typeof(T)))
            {
                case TypeCode.Boolean:
                    Console.WriteLine("型態是Boolean");
                    break;
                case TypeCode.Char:
                    Console.WriteLine("型態是Char");
                    break;
                case TypeCode.Int32:
                    Console.WriteLine("型態是Int");
                    break;
                case TypeCode.Single:
                    Console.WriteLine("型態是Float");
                    break;
                case TypeCode.Double:
                    Console.WriteLine("型態是Double");
                    break;
                default:
                    Console.WriteLine("沒有支持此資料型態");
                    break;

            }
        }
    }
}
