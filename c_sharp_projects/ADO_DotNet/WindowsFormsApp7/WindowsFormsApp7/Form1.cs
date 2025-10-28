using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp7
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            LinqCollection();
        }

        void LinqCollection()
        {
            Console.WriteLine("=============== Linq to 集合 ===============");
            string[] NameCollection = { "陳大貓", "王小明", "黃小貓", "張大書", "林玉珮" };


            // Linq 是直譯式的語言寫法，C Sharp 後來也改為直譯式的寫法
            // Linq 兩種Syntax 的寫法之1-1: query syntax
            // IEnumerable<string> myQueryResult = from name in NameCollection where name == "王小明" select name;

            // Linq 兩種Syntax 的寫法之1-2，不事先指定data type → 學習 javascript的語法
            /*
            var myQueryResult = from name 
                                in NameCollection 
                                where name == "王小明" 
                                select name;
            */
            // Linq 兩種Syntax 的寫法之2: method syntax 
            var myQueryResult = NameCollection.Where(name => name == "王小明");

            foreach (string item in myQueryResult) { 
                Console.WriteLine(item);
            }

            List<string> listResult = myQueryResult.ToList(); // make a copy of myQueryResult
            string[] arrayResult = myQueryResult.ToArray(); // make a copy of myQueryResult

            Console.WriteLine("==============================");

            myQueryResult = from name
                            in NameCollection
                            where name.Contains("小")
                            select name;

            myQueryResult = NameCollection.Where(name => name.Contains("小"));

            foreach (string item in myQueryResult) {
                Console.WriteLine(item);
            }

            Console.WriteLine("==============================");

            // 排序

            // 遞增
            myQueryResult = from name 
                            in NameCollection
                            orderby name ascending
                            select name;

            // 遞減
            myQueryResult = from name
                            in NameCollection
                            orderby name descending
                            select name;

            // Method Syntax
            myQueryResult = NameCollection.OrderBy(name => name); // ascending
            myQueryResult = myQueryResult.OrderByDescending(name => name);

            // 條件加排序
            // Query Syntax
            myQueryResult = from name
                            in NameCollection
                            where name.Contains("大")
                            orderby name ascending
                            select name;

            // Method Syntax
            myQueryResult = NameCollection.Where(name => name.Contains("大")).OrderBy(name => name);

            foreach (string item in myQueryResult) { 
                Console.WriteLine(item);
            }

            Console.WriteLine("==============================");

            // EXE: 輸出大於2的數列，由大到小排列
            int[] nums = new int[] { 9, 3, 6, 8, 1, 2, 3 };
            

            // Query Syntax:
            /*
            var result = from s
                         in nums
                         where s > 2
                         orderby s descending
                         select s;
            */
            var result = from s 
                     in nums
                     where (s > 3) && (s < 9)
                     select s;


            // Method Syntax
            result = nums.Where(s => s > 2).OrderByDescending(s => s);

            
            Console.WriteLine("==============================");
            
            // 求平均

            double Avg = nums.Average(s => s);
            Console.WriteLine($"數列平均: {Avg}");

            Console.WriteLine("==============================");

            // EXE 大於6 的平均
            double SubAvg = nums.Where(s => s >= 6).Average(s => s);
            // double SubAvg = nums.Average(s => s >= 6);  // Average() 沒有支搜條件篩選  
            Console.WriteLine($"數列大於6的平均: {SubAvg}");

            // Average 沒有支援條件

            
            Console.WriteLine("==============================");

            // EXE 使用 count 
            // 注意：count 有支援條件
            int Cnt = nums.Count(s => s > 2);
            Console.WriteLine($"數列中大於2的數量:{Cnt}");

            // EXE: 求 1-5，8-12，總共有幾個數字

            Cnt = nums.Count(s => (s >= 1 && s <= 5) || (s >= 8 && s <= 12));
            Console.WriteLine($"1...5 and 8...12 的數量:{Cnt}");

            Console.WriteLine("==============================");

            // 計算偶數的數量
            int Even = nums.Count(s => s % 2 == 0); // 取得奇數，餘數為1
            Even = nums.Where(s => s % 2 == 0).Count();

            Console.WriteLine($"數列中偶數的數量:{Even}");
            Console.WriteLine("==============================");

            // 取得第一個元素

            int intFirst = nums.First(); // C# 的語法
            int intEvenFirst = nums.First(s => s % 2 == 0);
            Console.WriteLine($"數列中第一個偶數: {intEvenFirst}");

            // 取得最後一個元素
            int intLast = nums.Last();
            int intOddLast = nums.Last(s => s % 2 == 1);

            Console.WriteLine($"數列中最後一個奇數: {intOddLast}");

            // 總和
            int intSum = nums.Sum(s => s);
            int intEvenSum = nums.Where(s => s % 2 == 0).Sum();

            Console.WriteLine($"偶數總和:{intEvenSum}");

            // 最大值

            int intMax = nums.Max(s => s);
            int intEvenMax = nums.Where(s => s % 2 == 0).Max(); // 使用條件的syntax
            
            // Linq 支搜大括號的語法，但是不建議用，syntax不是標準的寫法
            intEvenMax = nums.Max(s => { if (s % 2 == 0) return s; else return Int32.MinValue; });


            //
            int intMin = nums.Min(s => s);
            int intEvenMin = nums.Where(s => s % 2 == 0).Min(); // 加入條件式比較
















        }
    }
}
