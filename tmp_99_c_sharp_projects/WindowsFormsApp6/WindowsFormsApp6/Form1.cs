using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Collections;

namespace WindowsFormsApp6
{
    public partial class Form1 : Form
    {
        //類別變數 class variable
        List<ArrayList> list員工資料集合 = new List<ArrayList>();
        List<Hashtable> list會員資料集合 = new List<Hashtable>();

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void btnList_Click(object sender, EventArgs e)
        {
            Console.WriteLine("********** List Demo ***********");

            List<int> myIntList = new List<int>();
            myIntList.Add(1); //index:0
            myIntList.Add(2);
            myIntList.Add(3);
            myIntList.Add(4); //index:3
            myIntList.Add(5); //index:4
            myIntList.Add(6); //index:5

            Console.WriteLine($"索引值為3的元素是{myIntList[3]}");

            myIntList[4] = 99;

            Console.WriteLine($"索引值為4的元素是{myIntList[4]}");

            for (int i = 0; i < myIntList.Count; i += 1)
            {
                Console.WriteLine($"myIntList[{i}] = {myIntList[i]}");
            }

            List<int> myIntList2 = new List<int>() { 6,5,4,3,2,1 };

            Console.WriteLine("---------------------------------------------");

            List<string> myStringList = new List<string>();
            myStringList.Add("red");
            myStringList.Add("yellow");
            myStringList.Add("blue");
            myStringList.Add("purple");
            myStringList.Add("green");

            Console.WriteLine("============= 列出List所有元素 =============");

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= 修改List元素 =============");
            myStringList[1] = "lightyellow";
            myStringList[2] = "darkblue";

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= Insert 插入List元素 =============");
            myStringList.Insert(2, "skyblue");

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= InsertRange 插入List元素 =============");
            List<string> myNewStringList = new List<string>() { "gray", "brown", "pink"};
            myStringList.InsertRange(3, myNewStringList);

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= AddRange 插入List元素 =============");
            myStringList.AddRange(myNewStringList); //從尾部添加List

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= 移除List元素 =============");
            myStringList.Remove("gray"); //只會移除第一個gray元素
            myStringList.RemoveAt(3); //移除索引值3的元素, 其後的所有元素索引值都減一
            myStringList.RemoveRange(4, 3); //移除索引值4開始的3個元素, 移除4,5,6索引值的元素,其後所有元素的索引值都減三

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= sort 排序List元素 =============");
            myStringList.Sort();

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= Reverse 反轉List元素順序 =============");
            myStringList.Reverse();

            foreach (string color in myStringList)
            {
                Console.WriteLine($"{color}");
            }
            Console.WriteLine("============= IndexOf 搜尋 =============");
            int index = myStringList.IndexOf("pink");
            Console.WriteLine($"第一個pink字串元素的索引值:{index}");
            Console.WriteLine("============= List 轉 Array =============");
            string[] myTempArray = myStringList.ToArray();
            Console.WriteLine("============= Array 轉 List =============");
            List<string> myTempList = myTempArray.ToList();
            Console.WriteLine("============= Clear ==============");
            myStringList.Clear();

            Console.WriteLine($"count: {myStringList.Count}");
        }

        private void btnArrayList_Click(object sender, EventArgs e)
        {
            Console.WriteLine("============= ArrayList Demo =============");

            ArrayList myPersonInfo1 = new ArrayList();
            myPersonInfo1.Add("王小明");
            myPersonInfo1.Add(35000);
            myPersonInfo1.Add(DateTime.Now);
            myPersonInfo1.Add("0912-345-678");
            myPersonInfo1.Add("高雄市前金區中正路8888號");
            myPersonInfo1.Add(170.0);
            myPersonInfo1.Add(26);
            myPersonInfo1.Add(false);

            ArrayList myPersonInfo2 = new ArrayList();
            myPersonInfo2.Add("張大書");
            myPersonInfo2.Add(48000);
            myPersonInfo2.Add(new DateTime(2010,1,2,0,0,0));
            myPersonInfo2.Add("0966-888-999");
            myPersonInfo2.Add("台南市東區中華路6666號");
            myPersonInfo2.Add(173.0);
            myPersonInfo2.Add(42);
            myPersonInfo2.Add(true);

            list員工資料集合.Add(myPersonInfo1);
            list員工資料集合.Add(myPersonInfo2);

            foreach (ArrayList 員工 in list員工資料集合)
            {
                string 姓名 = Convert.ToString(員工[0]);
                int 薪資 = Convert.ToInt32(員工[1]);
                DateTime 到職日 = Convert.ToDateTime(員工[2]);
                string 電話 = Convert.ToString(員工[3]);
                string 地址 = Convert.ToString(員工[4]);
                double 身高 = Convert.ToDouble(員工[5]);
                int 年齡 = Convert.ToInt32(員工[6]);
                bool 婚姻狀態 = Convert.ToBoolean(員工[7]);

                string strMsg = $"{姓名} {薪資} {到職日} {電話} {地址} {身高} {年齡} {婚姻狀態}\n";

                Console.WriteLine(strMsg);
                Console.WriteLine("--------------------------------------------------------");
            }
            Console.WriteLine("==========================================================");
        }

        private void btnDictionary_Click(object sender, EventArgs e)
        {
            Console.WriteLine("============== Dictionary Demo ==============");
            Dictionary<string, int> dictNameScore = new Dictionary<string, int>();
            dictNameScore.Add("王小明", 84);
            dictNameScore.Add("陳大貓", 72);
            dictNameScore.Add("林玉珮", 93);
            dictNameScore.Add("張大書", 74);
            dictNameScore.Add("黃忠孝", 69);

            Console.WriteLine($"{dictNameScore["陳大貓"]}分");
            dictNameScore["黃忠孝"] = 79;
            Console.WriteLine($"{dictNameScore["黃忠孝"]}分");
            Console.WriteLine("----------------------------------------------");

            for (int i = 0; i < dictNameScore.Count; i += 1)
            {
                string 姓名 = dictNameScore.ElementAt(i).Key;
                int 分數 = dictNameScore.ElementAt(i).Value;
                Console.WriteLine($"姓名:{姓名} 分數:{分數}");
            }

            Console.WriteLine("----------------------------------------------");

            foreach (KeyValuePair<string, int> myKeyValue in dictNameScore)
            {
                Console.WriteLine($"姓名:{myKeyValue.Key} 成績:{myKeyValue.Value}");
            }

            Console.WriteLine("----------------------------------------------");

            foreach(string myKey in dictNameScore.Keys)
            {
                Console.WriteLine($"姓名:{myKey} 成績:{dictNameScore[myKey]}");
            }

            Console.WriteLine("----------------------------------------------");
            string strSearchKey = "林玉珮";
            bool is有這個Key = dictNameScore.ContainsKey(strSearchKey);
            if (is有這個Key)
            {
                Console.WriteLine($"有這個學生 {strSearchKey} 成績是 {dictNameScore[strSearchKey]}分");
            }
            Console.WriteLine("----------------------------------------------");
            int intSearchValue = 93;
            bool is有這個Value = dictNameScore.ContainsValue(intSearchValue);
            if (is有這個Value)
            {
                Console.WriteLine($"有這個分數 {intSearchValue}");
            }
            Console.WriteLine("----------------------------------------------");
            dictNameScore.Remove("黃忠孝");
            foreach (string myKey in dictNameScore.Keys)
            {
                Console.WriteLine($"姓名:{myKey} 成績:{dictNameScore[myKey]}");
            }
            Console.WriteLine("----------------------------------------------");

            string[] arrayKeyName = dictNameScore.Keys.ToArray();
            int[] arrayValueScore = dictNameScore.Values.ToArray();
            List<string> listName = dictNameScore.Keys.ToList();
            List<int> listScore = dictNameScore.Values.ToList();
            Console.WriteLine("----------------------------------------------");

            dictNameScore.Clear();
            Console.WriteLine($"count: {dictNameScore.Count}");
            Console.WriteLine("----------------------------------------------");
        }

        private void btnHashtable_Click(object sender, EventArgs e)
        {
            Console.WriteLine("============ Hashtable demo ============");
            Hashtable memberinfo1 = new Hashtable();
            memberinfo1.Add("姓名", "王大衛");
            memberinfo1.Add("年齡", 30);
            memberinfo1.Add("身高", 175.0);
            memberinfo1.Add("電話","0912-345-678");
            memberinfo1.Add("婚姻狀態", false);
            memberinfo1.Add("點數", 2300);

            Hashtable memberinfo2 = new Hashtable();
            memberinfo2.Add("姓名", "李瑪莉");
            memberinfo2.Add("年齡", 36);
            memberinfo2.Add("身高", 161.0);
            memberinfo2.Add("電話", "0977-999-111");
            memberinfo2.Add("婚姻狀態", true);
            memberinfo2.Add("點數", 3600);

            list會員資料集合.Add(memberinfo1);
            list會員資料集合.Add(memberinfo2);
            Console.WriteLine("-----------------------------------------");

            foreach (DictionaryEntry 欄位 in memberinfo1)
            {
                Console.WriteLine($"key: {欄位.Key}, value: {欄位.Value}");
            }
            Console.WriteLine("-----------------------------------------");

            foreach (Hashtable member in list會員資料集合)
            {
                foreach (DictionaryEntry 欄位 in member)
                {
                    Console.WriteLine($"key: {欄位.Key}, value: {欄位.Value}");
                }
                Console.WriteLine("=================================================");
            }

            Console.WriteLine("-----------------------------------------");

            string str欄位名稱 = "姓名";

            if (memberinfo1.Contains(str欄位名稱) == true)
            {
                Console.WriteLine($"{str欄位名稱} : {memberinfo1[str欄位名稱]}");
            }

            Console.WriteLine("-----------------------------------------");

            memberinfo1.Remove("年齡");

            foreach (DictionaryEntry 欄位 in memberinfo1)
            {
                Console.WriteLine($"key: {欄位.Key}, value: {欄位.Value}");
            }

            Console.WriteLine("-----------------------------------------");

            foreach (Hashtable member in list會員資料集合)
            {
                member.Clear();
            }

            list會員資料集合.Clear();

            Console.WriteLine($"memberinfo1 count : {memberinfo1.Count} memberinfo2 count : {memberinfo2.Count}");

        }
    }
}
