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

        }
    }
}
