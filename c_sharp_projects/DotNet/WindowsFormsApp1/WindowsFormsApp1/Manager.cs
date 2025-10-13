using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    public class Manager : Person, IMan
    {
        public MyEnum.Man 職稱代號;

        public override int 薪資
        {
            get
            {  //放=右邊取值
                return _薪資;
            }
            set
            { //放=左邊設定值
                if (value < 29500)
                {
                    value = 29500;
                }
                value += 6000; //主管加給
                _薪資 = value;
            }
        }
        
        public Manager() {
            Console.WriteLine("Manager預設建構式執行...");
        }

        public Manager(string name, float height, double weight)
        { //建構式多載overload
            Console.WriteLine("Manager多載建構式執行...");
            姓名 = name;
            身高 = height;
            體重 = weight;

            //讀取全域變數測試
            Console.WriteLine($"讀取全域變數 1: {GlobalVar.myGlobalVar1}");
            Console.WriteLine($"讀取全域變數 2: {GlobalVar.myGlobalVar2}");
            //讀取常數
            Console.WriteLine($"讀取常數 pi : {GlobalVar.pi}");

        }

        public override void 顯示基本資料()
        { //覆寫 override
            string strMsg = $"{this.姓名}\n{身高}cm\n{體重}kg\n到職日 {到職日:D}\n薪資 {薪資}元";
            strMsg += $"\n職稱 {顯示職務名稱(職稱代號, "en")}";
            strMsg += "\n-----------------------------\n <<管理職>>";

            MessageBox.Show(strMsg);
        }

        public string 顯示職務名稱(MyEnum.Man my列舉代號, string lang)
        {
            string strMan = "";

            Dictionary<MyEnum.Man, string> dict職稱集合 = new Dictionary<MyEnum.Man, string>();

            if (lang == "tw")
            {
                dict職稱集合 = new Dictionary<MyEnum.Man, string>() {
                    { MyEnum.Man.董事長, "集團董事長"},
                    { MyEnum.Man.總經理, "總經理"},
                    { MyEnum.Man.副總, "副總經理"},
                    { MyEnum.Man.經理, "部經理"},
                    { MyEnum.Man.協理, "部門協理"},
                    { MyEnum.Man.組長, "專案組長"}
                };
            } 
            else if (lang == "en")
            {
                dict職稱集合 = new Dictionary<MyEnum.Man, string>() {
                    { MyEnum.Man.董事長, "President"},
                    { MyEnum.Man.總經理, "CEO"},
                    { MyEnum.Man.副總, "Vice President"},
                    { MyEnum.Man.經理, "Dept Manager"},
                    { MyEnum.Man.協理, "Director"},
                    { MyEnum.Man.組長, "Team Leader"}
                };
            }
            else if (lang == "jp")
            {

            }
            else
            {

            }

            bool is有Key = dict職稱集合.ContainsKey(my列舉代號);

            if (is有Key)
            {
                strMan = dict職稱集合[my列舉代號];
                Console.WriteLine($"列舉常數值: {(int)my列舉代號}");

            }
            else
            {
                MessageBox.Show("職稱代號錯誤");
            }

            return strMan;
        }
    }
}
