using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp2
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //算術運算式
            Console.WriteLine("========== 算術運算式 Math Operator =========");
            int x = 10;
            int y = 20;
            int z = 0;

            z = x + y; //z指定(assign)為x + y的運算結果
            Console.WriteLine($"{x} + {y} = {z}");
            z = x - y;
            Console.WriteLine($"{x} - {y} = {z}");
            z = x * y;
            Console.WriteLine($"{x} × {y} = {z}");
            z = x / y; //整數運算會去小數
            Console.WriteLine($"{x} ÷ {y} = {z}");
            z = x % y; //餘數
            Console.WriteLine($"{x} 除以 {y} 的餘數是 {z}");
            z = x + y * y; //先乘除後加減
            Console.WriteLine($"{x} + {y} × {y} = {z}");
            z = (x + y) * y; //小括號先行
            Console.WriteLine($"({x} + {y}) × {y} = {z}");
            z = -x + y; //負數運算
            Console.WriteLine($"-{x} + {y} = {z}");

            Console.WriteLine("========== 整數和浮點數 ==========");
            int x2 = 10;
            double y2 = 14;
            double z2 = 0;

            z2 = x2 + y2;
            Console.WriteLine($"{z2}");
            z2 = x2 / y2;
            Console.WriteLine($"{z2}");

            Console.WriteLine("========== 算術指定運算子 ==========");
            int c = 250;
            int d = 100;

            //c = c + 30;
            //c += 30; //c = c + 30;
            //c -= 30; //c = c - 30;
            //c *= 2; //c = c * 2;
            //c /= 2; //c = c / 2;
            //c %= 3;  //c = c % 3;
            c += d;
            Console.WriteLine($"c的值是 {c}");

            Console.WriteLine("========== 遞增遞減運算子 ==========");
            int r = 8;

            r = r + 1;
            r += 1;
            r++;

            r = r - 1;
            r -= 1;
            r--;
            Console.WriteLine($"r的值:{r}");

            Console.WriteLine("========== 關係運算式 Relational Operator ==========");
            int m = 85;
            int n = 45;
            bool compare = false;

            compare = m == n; //false 不成立, 失敗, 偽, no
            compare = m != n; //true 成立, 真, yes
            compare = m > n; //true
            compare = m < n; //false
            compare = m >= n; //true
            compare = m <= n; //false

            Console.WriteLine($"關係運算結果: {compare}");
            Console.WriteLine("============================================");

            int p = 57;
            int w = 92;
            bool logic = false;

            logic = (p > w) && (p >= 50); //false
            logic = (p > 60) && (p != w); //false
            logic = (w <= 80) || (p <= w); //true
            logic = (p > w) || (w < 20); //false
            logic = (p > 40) && (w < 120) && (p == w); //false
            logic = (p < 30) || (w > 100) || (p != w); //true
            logic = (p > 30) || (w < 50) && (p < w); //&&要先算 true
            logic = ((p > 20) || (w > 76)) && (p >= w); //小括號先行 false
            logic = !(p >= w);
            //logic = (p > w) & (p >= 50);  //false
            //logic = (w <= 80) | (p <= w); //true
            //logic = logic & (p == w);
            //logic &= (p == w);

            Console.WriteLine($"關係運算式結果: {logic}");
            Console.WriteLine("============================================");
            Console.ReadKey();

        }
    }
}
