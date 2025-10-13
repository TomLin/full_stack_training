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
            Console.WriteLine("============ 多維陣列 ==============");
            Console.WriteLine("------------ 二維陣列 --------------");
            //Two Dimension Array
            int[,] arrayTwoDimOne = new int[4, 2];
            arrayTwoDimOne[0, 0] = 1;
            arrayTwoDimOne[0, 1] = 2;
            arrayTwoDimOne[1, 0] = 3;
            arrayTwoDimOne[1, 1] = 4;
            arrayTwoDimOne[2, 0] = 5;
            arrayTwoDimOne[2, 1] = 6;
            arrayTwoDimOne[3, 0] = 7;
            arrayTwoDimOne[3, 1] = 8;

            Console.WriteLine($"arrayTwoDimOne的Length: {arrayTwoDimOne.Length}");
            Console.WriteLine("------------------------------------------------");

            for (int i = 0; i < 4; i += 1)
            {
                for (int j = 0; j < 2; j += 1)
                {
                    Console.WriteLine($"arrayTwoDimOne[{i},{j}] = {arrayTwoDimOne[i, j]}");
                }
            }
            Console.WriteLine("------------------------------------------------");
            for (int i = 0; i <= arrayTwoDimOne.GetUpperBound(0); i += 1)
            {
                for (int j = 0; j <= arrayTwoDimOne.GetUpperBound(1); j += 1)
                {
                    Console.Write($"[{arrayTwoDimOne[i, j]}]");
                }
                Console.WriteLine();
            }
            Console.WriteLine("------------------------------------------------");
            Console.WriteLine("二維陣列簡寫法");
            int[,] arrayTwoDimTwo =
            {
                {1,2},
                {3,4},
                {5,6},
                {7,8}
            };
            Console.WriteLine("------------------------------------------------");
            int[,,] arrayThreeDimOne = new int[2, 3, 4];

            Console.WriteLine($"三維陣列簡寫法, 長度: {arrayThreeDimOne.Length}");
            int[,,] arrayThreeDimTwo =
            {
                {
                    { 1,2,3,4},
                    { 5,6,7,8},
                    { 9,10,11,12}
                },
                {
                    { 13,14,15,16},
                    { 17,18,19,20},
                    { 21,22,23,24}
                }
            };

            for (int i = 0; i <= arrayThreeDimTwo.GetUpperBound(0); i += 1)
            {
                for (int j = 0; j <= arrayThreeDimTwo.GetUpperBound(1); j += 1)
                {
                    for (int k = 0; k <= arrayThreeDimTwo.GetUpperBound(2); k += 1)
                    {
                        Console.Write($"[{arrayThreeDimTwo[i, j, k]}]");
                    }
                    Console.WriteLine();
                }
                Console.WriteLine();
            }

            Console.WriteLine("====================================");
            Console.ReadKey();

            ////////////////////////////////////////////////////////////////
            /// 練習題1: 請寫一個C#的Console程式, 輸入任意整數(資料型態為ulong), 判斷它是否為質數(prime)
            /// 練習題2: 請寫一個C#的Console程式, 求得 ulong 的最大質數是多少?
            /// 
            // 練習步驟:
            // step 1. 自己嘗試寫作
            // step 2. Google 部落格的教學範例, 再模仿寫一次
            // step 3. 使用AI工具產生
            // (我是初學的學生, 請給我範例, 並且詳細的解釋, 簡單容易理解一點, 謝謝拜託了)
            // (請告訴我, 目前求質數最快的方法)
        }
    }
}
