using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp2
{
    public partial class Form1 : Form
    {   // 語法和interface有點像，但是多了delegate保留字

        // 委派的定義，需要和方法的寫法一致(在回傳值、參數的數量、資料型態、順序等)
        // 名稱和參數的名稱可以不一樣
        public delegate void MyDelegate(string name);
        public delegate string MyDelegate2(string msg);

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        void methodOne(string myMsg)
        {  // 符合 public delegate void MyDelegate(string name);的定義，形式要一樣
            MessageBox.Show($"methodOne執行，傳入參數： {myMsg}");
        }

        void 測試myDelegateOne傳遞物件化的方法(MyDelegate objDelegate)
        {
            objDelegate("methodOne物件化後，傳遞進入方法執行");

        }

        string methodTwo(string myMsg)
        {  // 符合 public delegate string MyDelegate2(string msg);的定義，形式要一樣
            return $"methodTwo執行，參數是：{myMsg}";
        }

        void 測試myDelegateTwo傳遞物件化的方法(MyDelegate2 objDelegate2)
        {
            MessageBox.Show($"{objDelegate2("methodTwo物件化後，傳遞進入方法執行")}");
        }

        private void btnDelegate_Click(object sender, EventArgs e)
        {
            /*
            MessageBox.Show($"{methodOne("一般方法執行")}");
            
            // 指定methodOne給委派物件 (reference)
            MyDelegate myDelegateOne = methodOne; // 不用methodone() → 加上括號，是指執行的

            myDelegateOne("methodOne物件化後，指定給委派物件執行");

            測試myDelegateOne傳遞物件化的方法(myDelegateOne);

            測試myDelegateOne傳遞物件化的方法(methodOne);
            
            */


            /*
            MessageBox.Show($"{methodTwo("一般方法執行")}");

            MyDelegate2 myDelegateTwo = methodTwo;

            myDelegateTwo("methodTwo物件化後，指定給委派物執行");

            測試myDelegateTwo傳遞物件化的方法(myDelegateTwo);

            測試myDelegateTwo傳遞物件化的方法(methodTwo);
            
            */


        }

        void plus(int a, int b)
        {
            MessageBox.Show($"Action: {a} + {b} = {a + b}");
        }

        void 測試Action(Action<int, int> myActionPlus)
        {
            myActionPlus(5, 6);
        }


        private void btnAction_Click(object sender, EventArgs e)
        {
            // 一般方法
            // plus(1, 2);
            
            // 委派的方式 → Action 保留字是簡寫法，用在沒有回傳值的委派
            Action<int, int> actionPlus = plus; // 這是委派(delegate)
            actionPlus(3, 4);

            // 也可以將委派，再次當作參數，丟到一個方法中
            // 測試Action(actionPlus);
            
            // 這個方法，也可以直接拿最原本的方法，當作參數
            // 它可以辨認出這是委派，因為前面程式碼有寫了
            // 測試Action(plus);
            

        }

        double avg(int a, int b, int c)
        {
            return (double)(a + b + c)/3;
        }

        void 測試func(Func<int, int, int, double> myFuncAVG)
        {
            MessageBox.Show($"測試Func, average: {myFuncAVG(1, 5, 7)}");
        }


        private void btnFunc_Click(object sender, EventArgs e)
        {
            // 一般方法
            // MessageBox.Show($"Average: {avg(5, 6, 7)}");

            // 委派方法
            // 委派的方式 → Func 保留字是簡寫法，用在有回傳值的委派，最後一個參數，是回傳值的data type
            Func<int, int, int, double> funcAvg = avg;
            MessageBox.Show($"Average: {funcAvg(5, 6, 8)}");

            // 也可以將委派，再次當作參數，丟到一個方法中
            // 測試func(funcAvg);

            // 這個方法，也可以直接拿最原本的方法，當作參數
            // 它可以辨認出這是委派，因為前面程式碼有寫了
            // 測試func(avg);


        }
    }
}
