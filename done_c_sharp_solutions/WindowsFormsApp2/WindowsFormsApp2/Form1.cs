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
    {
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
        { //符合 public delegate void MyDelegate(string name); 的定義, 形式要一樣

            MessageBox.Show($"methodOne執行, 傳入參數: {myMsg}");
        }

        void 測試myDelegateOne傳遞物件化的方法(MyDelegate objDelegate)
        {
            objDelegate("mehtodOne物件化後, 傳遞進入方法執行");
        }

        string methodTwo(string myMsg)
        { //符合 public delegate string MyDelegate2(string msg);的定義, 形式要一樣
            return $"methodTwo 執行, 參數是: {myMsg}";
        }

        void 測試myDelegateTwo傳遞物件化的方法(MyDelegate2 objDelegate2)
        {
            MessageBox.Show($"{objDelegate2("mehtodTwo物件化後, 傳遞進入方法執行")}");
        }

        private void btnDelegate_Click(object sender, EventArgs e)
        {
            //methodOne("一般的方法執行");
            //MyDelegate myDelegateOne = methodOne; //指定methodOne給委派物件, Reference
            //myDelegateOne("methodOne物件化後, 指定給委派物件執行");
            //測試myDelegateOne傳遞物件化的方法(methodOne);
            //測試myDelegateOne傳遞物件化的方法(myDelegateOne);
            /////////////////////////////////////////////////////
            //MessageBox.Show($"{methodTwo("一般方法執行")}");
            MyDelegate2 myDelagteTwo = methodTwo;
            //MessageBox.Show($"{myDelagteTwo("methodTwo物件化後, 指定給委派物件執行")}");
            //測試myDelegateTwo傳遞物件化的方法(methodTwo);
            測試myDelegateTwo傳遞物件化的方法(myDelagteTwo);
        }

        void plus(int a, int b)
        {
            MessageBox.Show($"Action: {a} + {b} = {a + b}");
        }

        void 測試Action(Action<int, int> myActionPlus)
        {
            myActionPlus(5,6);
        }

        private void btnAction_Click(object sender, EventArgs e)
        {
            //plus(1, 2);
            Action<int, int> actionPlus = plus;
            //actionPlus(3,4);
            //測試Action(plus);
            測試Action(actionPlus);
        }

        double avg(int a, int b, int c)
        {
            return (double)(a + b + c) / 3;
        }

        void 測試func(Func<int,int,int,double> myFuncAVG)
        {
            MessageBox.Show($"測試Func , average:{myFuncAVG(1,5,7)}");
        }

        private void btnFunc_Click(object sender, EventArgs e)
        {
            //MessageBox.Show($"Average: {avg(5,6,8)}");
            Func<int, int, int, double> funcAvg = avg;
            //MessageBox.Show($"Average: {funcAvg(5, 6, 8)}");
            測試func(funcAvg);
            //測試func(avg);
        }
    }
}
