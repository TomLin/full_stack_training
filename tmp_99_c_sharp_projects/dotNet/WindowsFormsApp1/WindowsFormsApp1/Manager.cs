using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    internal class Manager : Person, IMan
    {
        public MyEnum.Man 職稱代號;
        public override int 薪資
        {
            get
            {
                return _薪資;
            }

            set
            {
                if (value < 29500)
                {
                    value = 29500;
                }
                value += 8000; // 主管加給
                _薪資 = value;

            }
        }


        public Manager() 
        {   // 建構式
            // 在執行建構式時，子類別，也會同時執行父類別的建構式
            Console.WriteLine("Manager 預設建構式執行...");

            // 讀取靜態(全域)變數
            Console.WriteLine($"讀取全域變數 1: {GlovalVar.myGlovalVar1}");
            Console.WriteLine($"讀取全域變數 2: {GlovalVar.myGlovalVar2}");

        }

        public Manager(string name, float height, double weight)
        {   // 建構式的overload
            Console.WriteLine("Manager多載建構式執行…(參數 name, height, weight)");
            姓名 = name;
            身高 = height;
            體重 = weight;

            // 讀取靜態(全域)變數
            Console.WriteLine($"讀取全域變數 1: {GlovalVar.myGlovalVar1}");
            Console.WriteLine($"讀取全域變數 2: {GlovalVar.myGlovalVar2}");

        }

        // 要覆寫父類別的方法，需要加上override的關鍵字
        public override void 顯示基本資料()
        {
            string strMsg = $"姓名：{this.姓名} {身高}cm {體重}kg 到職日：{到職日} 薪資：{薪資}元";
            strMsg += "\n-----------------------------\n <<管理職>>";
            MessageBox.Show(strMsg);
        }

        public string 顯示職務名稱(MyEnum.Man my列舉代號, string lang)
        {
            string strMan = "";

            Dictionary<MyEnum.Man, string> dict職務集合 = new Dictionary<MyEnum.Man, string>();

            if (lang == "tw")
            {
                dict職務集合 = new Dictionary<MyEnum.Man, string>()
                {
                    {MyEnum.Man.董事長, "集團董事長"},
                    {MyEnum.Man.總經理, "集團總經理"},
                    {MyEnum.Man.副總, "集團副總"}

                };
            }
            else if (lang == "en")
            {
                dict職務集合 = new Dictionary<MyEnum.Man, string>()
                {
                    { MyEnum.Man.董事長, "President" },
                    { MyEnum.Man.總經理, "CEO" },
                    { MyEnum.Man.副總, "Vice President" }
                };
            }

            strMan = dict職務集合[my列舉代號];
            return strMan;
        }

    }
}
