using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp1
{
    internal class Person
    {   //功能: 處理員工基本資料
        //類別成員member: 欄位, 屬性, 方法
        // 欄位 Field
        public float 身高 = 0.0f;
        public double 體重 = 0.0;
        public DateTime 到職日 = DateTime.Now;

        // 屬性 Property
        public string 姓名 { get; set; }
        private int _薪資; // 這是private的field，會用property來get/set
        public int 薪資
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

        public Person()
        {  //預設建構式, 建構方法(construct method), 建構子(constructor), 初始化方法(initialize method), 實體化方法(instantiate method)
            Console.WriteLine("Person 預設建構式執行...");
        }


        public void 顯示基本資料()
        {   // 這裡是指class實體的field，所以加上this，在沒有與區域變數名稱衝突下，可以省略this
            string strMsg = $"{this.姓名}\n{身高}cm\n{體重}kg\n到職日 {到職日:D}\n薪資 {薪資}元";

            MessageBox.Show(strMsg);
        }
    }
}
