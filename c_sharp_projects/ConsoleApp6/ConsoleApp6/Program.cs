using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("============= 多重迴圈 ===============");
            Console.WriteLine("------------  十十乘法表  -------------");

            for (int i = 1; i <= 10; i += 1)
            {
                for (int j = 1; j <= 10; j += 1)
                {
                    Console.WriteLine($"{i} × {j} = {i * j}");
                }
                Console.WriteLine("----------");
            }

            Console.WriteLine("------------- 表格 1 ------------------");
            //表格 table 5列(row) 9欄(column)

            for (int i = 1; i <= 5; i += 1)
            {
                for (int j = 1; j <= 9; j += 1)
                {
                    Console.Write($"[{i},{j}]");
                }
                Console.WriteLine();
            }

            Console.WriteLine("======================================");
            Console.ReadKey();

        }
    }
}
