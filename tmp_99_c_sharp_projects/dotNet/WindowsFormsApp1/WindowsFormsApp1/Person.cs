using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{   // class Person : object 預設沒有寫出父繼承，都是繼承自 object
    internal class Person:Object 
    {
        // 功能：處理員工基本資料
        // 類別成員(mebmers): 欄位、屬性、方法
        
        // 欄位(field) 又稱作類別變數
        public float 身高 = 0.0f;
        public double 體重 = 0.0;
        public DateTime 到職日 = DateTime.Now;
        public MyEnum.Dep 部門代號;


        // 屬性(property)
        public string 姓名 {  get; set; }

        // private 的欄位(field), 是不可以被子類別繼承使用
        // private int _薪資;

        protected int _薪資;

        // property 需要被子類別覆寫，也需要加上 virtual 關鍵字
        public virtual int 薪資
        {   // 在property裡面，都可以直接使用value這個變數，來set value or get value
            get 
            {
                return _薪資;
            }
            set 
            {    
                if (value < 29500) // 薪資不能低於基本薪資
                {
                    value = 29500; 
                }
                _薪資 = value;
            }
        }

        // 結構欄位
        public AddressInfo 地址;


        public Person()
        {   // constructor 
            Console.WriteLine("Person 預設建構式執行...");
        }

        public Person(string name, DateTime my到職日)
        {   // 建構式的多載(overload)
            姓名 = name;
            到職日 = my到職日;
        }

        public static void aboutInfo()
        {
            MessageBox.Show($"類別名稱：Person\n功能：處理員工基本資料\nver:1.0");
        }
        
        
        
        // virtual 關鍵字，表示該方法，可以被子類別覆寫
        public virtual void 顯示基本資料()
        {   // 在類別中，使用自身的變數，可以用 this.姓名 的方式，但是微軟工程師建議，不需要加上this的寫法
            string strMsg = $"姓名：{this.姓名} {身高}cm {體重}kg 到職日：{到職日} 薪資：{薪資}元\n" +
                $"部門名稱 {顯示部門名稱(部門代號)}";
            MessageBox.Show(strMsg);
        }


        public string 顯示部門名稱(MyEnum.Dep my列舉代號)
        {
            string strMsg = "";

            Dictionary<MyEnum.Dep, string> dict部門名稱 = new Dictionary<MyEnum.Dep, string>
            {{MyEnum.Dep.行政處, "集團行政" },
                {MyEnum.Dep.資訊處, "集團資訊" },
                {MyEnum.Dep.業務部, "集團業務" },
                {MyEnum.Dep.研發部, "集團研發" }
            };

            bool is有Key = dict部門名稱.ContainsKey(my列舉代號);

            if (is有Key) 
            { 
                strMsg = dict部門名稱[my列舉代號];

                // 列舉代號，需要用int進行型別轉換
                Console.WriteLine($"列舉的常數值 {Convert.ToInt32(my列舉代號)}");
            }
            else
            {
                MessageBox.Show("尚無相關的部門名稱");
            }

                return strMsg;

        }



    }
}
