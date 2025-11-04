using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DreamClock
{
    public class GlobalVar
    {
        // DB config
        public static string ImgDir = @"C:\Users\thebl\source\repos\full_stack_training" + 
                                        @"\mini_c_sharp_project\DreamClock\DreamClock\bin\Debug\Img";
        public static string dataSrc = @"localhost\MSSQLSERVER01";
        public static string catalog = @"dreamClock";

        // Log in info
        public static string memAcct;
        public static string memPassword;
        public static bool isLogIn;
    }
}
