using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WindowsFormsApp1; // 當引用別的加入的Class，記得加入它的NameSpace 才能使用


namespace WindowsFormsApp8
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            LingToClass();
        }

        void LingToClass()
        {
            List<Person> listPeople = new List<Person>();
            listPeople.Add(new Person() { 姓名 = "David", 薪資 = 35000, 身高 = 170.0f, 體重 = 70.0 });
            listPeople.Add(new Person() { 姓名 = "Joy", 薪資 = 46000, 身高 = 172.0f, 體重 = 75.0 });
            listPeople.Add(new Person() { 姓名 = "David", 薪資 = 45000, 身高 = 175.0f, 體重 = 80.0 });
            listPeople.Add(new Person() { 姓名 = "Alex", 薪資 = 32000, 身高 = 160.0f, 體重 = 60.0 });
            listPeople.Add(new Person() { 姓名 = "Wang", 薪資 = 29000, 身高 = 168.0f, 體重 = 50.0 });
            listPeople.Add(new Person() { 姓名 = "John", 薪資 = 56000, 身高 = 162.0f, 體重 = 85.0 });
            listPeople.Add(new Person() { 姓名 = "Mary", 薪資 = 56000, 身高 = 158.0f, 體重 = 72.0 });
            listPeople.Add(new Person() { 姓名 = "Eric", 薪資 = 52000, 身高 = 164.0f, 體重 = 52.0 });
            listPeople.Add(new Person() { 姓名 = "Brian", 薪資 = 62000, 身高 = 176.0f, 體重 = 73.0 });

            Console.WriteLine("========== Linq to Class ==========");
            var result = from s
                         in listPeople
                         select s;

            foreach (Person item in result) // 也可以寫成 foreach(var item in result)
            {
                Console.WriteLine($"姓名:{item.姓名}, 薪資:{item.薪資}, 身高:{item.身高}, 體垂:{item.體重}");
            }

            Console.WriteLine("====================");

            // 查詢所有員工，以薪資高到低排序
            result = from s in listPeople
                     orderby s.薪資 descending
                     select s;

            // 注意：這邊的 s 是 object
            result = listPeople.OrderByDescending(s => s.薪資);

            // EXE 查詢員工，薪資是 30000 - 50000, 身高由小到大
            result = listPeople.Where(s => s.薪資 >= 30000 && s.薪資 <= 50000).OrderBy(s => s.身高);

            // EXE 查詢姓名含有 i (試著包含uppecase I) 的員工，以體重大小排序 descending
            // 多重條件下的 contains 寫法
            result = listPeople.Where(s => s.姓名.Contains("i") || s.姓名.Contains("I")).OrderByDescending(s => s.體重);

            // EXE 查詢身高170以上的員工，並試算他們的平均薪資

            double avgSalary = listPeople.Where(s => s.身高 > 170.0).Average(s => s.薪資);

            Console.WriteLine($"身高170以上的員工, 平均薪資: {avgSalary}");

            // EXE 身高小於等於170，最高薪是多少？
            int topSalary = 0;
            // topSalary = listPeople.Where(s => s.身高 <= 170.0).OrderByDescending(s => s.薪資).Max(s => s.薪資);
            topSalary = listPeople.Where(s => s.身高 <= 170.0).OrderByDescending(s => s.薪資).Select(s => s.薪資).First();

            // EXE 查詢身高170以上員工，他們最高薪的是誰？
            var topOne = listPeople.Where(s => s.身高 > 170.0).OrderByDescending(s => s.薪資).First();
            topOne = listPeople.Where(s => s.身高 > 170.0).OrderBy(s => s.薪資).Last();

            // EXE (多重排序) 身高170 以下員工，先排薪資，再排序體重
            // Linq 最多只支援兩個欄位的排序
            result = listPeople.Where(s => s.身高 > 170.0).OrderByDescending(s => s.薪資).ThenByDescending(s => s.體重);


            var resultGroup = listPeople.GroupBy(s => s.姓名);

            foreach( var group in resultGroup)
            {   
                Console.WriteLine($"group: {group.Key}"); // 群組名稱

                foreach (var item in group)
                {
                    Console.WriteLine($"姓名:{item.姓名}, 薪資:{item.薪資}, 身高:{item.身高}, 體垂:{item.體重}");

                }

                Console.WriteLine("--------------------------------");

            }




        }

    }
}

