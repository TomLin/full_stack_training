using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp8
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("========== 多維陣列 ==========");

            Console.WriteLine("---------- 二維陣列 ----------");
            // two dimentional array
            int[,] arrayTwoDimOne = new int[4, 2]; // 4 rows, 2 columns

            arrayTwoDimOne[0,0] = 1;
            arrayTwoDimOne[0,1] = 2;
            arrayTwoDimOne[1,0] = 3;
            arrayTwoDimOne[1,1] = 4;
            arrayTwoDimOne[2,0] = 5;
            arrayTwoDimOne[2,1] = 6;
            arrayTwoDimOne[3,0] = 7;
            arrayTwoDimOne[3,1] = 8;

            Console.WriteLine($"arrayTwoDimOne的length: {arrayTwoDimOne.Length}");
            Console.WriteLine("-----------------------------");

            for (int i = 0; i <= arrayTwoDimOne.GetUpperBound(0); i++)
            {
                for (int j = 0; j <= arrayTwoDimOne.GetUpperBound(1); j++)
                {
                    Console.Write($"[arrayTwoDimOne[{i},{j}] = {arrayTwoDimOne[i, j]}]");
                }
                Console.WriteLine();
            }

            Console.WriteLine("-----------------------------");
            Console.WriteLine("二維陣列簡寫法");

            int[,] arrayTwoDimTwo =
            {
                {1,2},
                {3,4},
                {5,6},
                {7,8}
            };
            
            Console.WriteLine("-----------------------------");

            Console.WriteLine("三維陣列簡寫法");
            int[,,] arrayThreeDimOne = new int[2, 3, 4];
            int[,,] arrayThreeDimTwo =
            {
                { {1,2,3,4 },
                  {5,6,7,8 },
                  {9,10,11,12}
                },
                { {13,14,15,16},
                  {17,18,19,20},
                  {21,22,23,24}
                }
            };

            Console.WriteLine($"三維陣列的長度: {arrayThreeDimTwo.Length}");

            for (int i = 0; i <= arrayThreeDimTwo.GetUpperBound(0); i++)
            {
                for (int j = 0; j <= arrayThreeDimTwo.GetUpperBound(1); j++)
                {
                    for (int k = 0; k <= arrayThreeDimTwo.GetUpperBound(2); k++)
                    {
                        Console.Write($"[{arrayThreeDimTwo[i, j, k]}]");
                    }
                    Console.WriteLine();
                }
                Console.WriteLine();
            }

            Console.WriteLine("=============================");
            Console.ReadKey();

            /* 練習題 01: 請寫一個C#的Console程式，輸入任意整數(資料型態為ulong)，判斷它是否為質數
             * 練習題 02: 求出ulong的最大質數是？
             */
        }
    }
}
