using System;
using System.Collections.Generic;
using System.Drawing.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public class Person
    {   //功能: 處理員工基本資料
        //類別成員member: 欄位, 屬性, 方法
        // 欄位 Field
        public float 身高 = 0.0f;
        public double 體重 = 0.0;
        public DateTime 到職日 = DateTime.Now;
        public MyEnum.Dep 部門代號;

        // 屬性 Property
        public string 姓名 { get; set; }
        //private int _薪資;
        protected int _薪資;

        public virtual int 薪資
        {
            get
            {  //放=右邊取值
                //練習題: 百元以下, 進位百元
                return _薪資;
            }
            set
            { //放=左邊設定值
                if (value < 29500)
                {
                    value = 29500;
                }
                _薪資 = value;
            }
        }

        //struct結構欄位
        public AddressInfo 地址;

        //泛型欄位
        public PersonInfo<string> Email = new PersonInfo<string>();
        public PersonInfo<int> 年齡 = new PersonInfo<int>();



        public Person()
        {  //預設建構式, 建構方法(construct method), 建構子(constructor), 初始化方法(initialize method), 實體化方法(instantiate method)
            Console.WriteLine("Person 預設建構式執行...");
        }

        public Person(string name)
        { //建構式多載overload
            Console.WriteLine("Person 多載建構式執行...");
            姓名 = name;
        }

        public Person(string name, DateTime my到職日)
        { //建構式多載overload
            Console.WriteLine("Person 多載建構式執行...");
            姓名 = name;
            到職日 = my到職日;
        }

        public static void aboutInfo()
        {
            MessageBox.Show($"類別名稱:Person\n功能:處理員工基本資料\nver: 1.0");
        }

        public virtual void 顯示基本資料()
        {
            string strMsg = $"{this.姓名}\n{身高}cm\n{體重}kg\n到職日 {到職日:D}\n薪資 {薪資}元\n部門名稱 {顯示部門名稱(部門代號)}\n地址 {地址.輸出完整地址有郵遞區號()}";
            strMsg += $"\n郵件 {Email.myData} 年齡 {年齡.myData}";
            MessageBox.Show(strMsg);
        }

        public string 顯示部門名稱(MyEnum.Dep my列舉代號)
        {
            string strMsg = "";

            Dictionary<MyEnum.Dep, string> dict部門名稱 = new Dictionary<MyEnum.Dep, string> { { MyEnum.Dep.行政處, "行政執行處"},
                { MyEnum.Dep.資訊處, "集團資訊處"},
                { MyEnum.Dep.業務部, "業務推廣部"},
                { MyEnum.Dep.研發部, "創新研發部"}
            };

            bool is有Key = dict部門名稱.ContainsKey(my列舉代號);

            if (is有Key)
            {
                strMsg = dict部門名稱[my列舉代號];
                //Console.WriteLine($"列舉常數值: {Convert.ToInt32(my列舉代號)}");
                Console.WriteLine($"列舉常數值: {(int)my列舉代號}");

            }
            else
            {
                MessageBox.Show("部門代號錯誤");
            }

                return strMsg;
        }
    }
}
