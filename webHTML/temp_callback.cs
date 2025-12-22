using System;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("--- 程式開始 ---");

        // 我們呼叫 ProcessData，並將 "PrintFinishedMessage" 當作 callback (呼叫器) 傳進去
        ProcessData("User123", PrintFinishedMessage);

        Console.WriteLine("--- 程式結束 ---");
    }

    // 這就是我們準備用來當作 Callback 的函式
    public static void PrintFinishedMessage()
    {
        Console.WriteLine(">> CALLBACK: 資料處理已經完成了！");
    }

    // 這個函式接收一個字串，以及一個 Action (Callback)
    public static void ProcessData(string data, Action callback)
    {
        Console.WriteLine($"1. 開始處理資料: {data}...");
        
        // 模擬一些工作正在進行 (暫停 2 秒)
        System.Threading.Thread.Sleep(2000); 
        
        Console.WriteLine("2. 工作結束。");

        // 工作做完了，現在執行 Callback (讓呼叫器震動)
        // 檢查 callback 是否為 null 是個好習慣，避免程式崩潰
        if (callback != null)
        {
            callback(); 
        }
    }
}