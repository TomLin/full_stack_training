namespace DreamClock
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.cirProgBarWork = new CircularProgressBar.CircularProgressBar();
            this.txtRepTime = new System.Windows.Forms.TextBox();
            this.btnAccept = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtCntDownSec = new System.Windows.Forms.TextBox();
            this.button2 = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.progressBar1 = new System.Windows.Forms.ProgressBar();
            this.progressBar2 = new System.Windows.Forms.ProgressBar();
            this.label7 = new System.Windows.Forms.Label();
            this.button3 = new System.Windows.Forms.Button();
            this.timerWork = new System.Windows.Forms.Timer(this.components);
            this.cirProgBarRest = new CircularProgressBar.CircularProgressBar();
            this.timerRest = new System.Windows.Forms.Timer(this.components);
            this.SuspendLayout();
            // 
            // cirProgBarWork
            // 
            this.cirProgBarWork.AnimationFunction = WinFormAnimation.KnownAnimationFunctions.Liner;
            this.cirProgBarWork.AnimationSpeed = 500;
            this.cirProgBarWork.BackColor = System.Drawing.Color.Transparent;
            this.cirProgBarWork.Font = new System.Drawing.Font("Microsoft YaHei UI", 48F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarWork.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.cirProgBarWork.InnerColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.cirProgBarWork.InnerMargin = 2;
            this.cirProgBarWork.InnerWidth = -1;
            this.cirProgBarWork.Location = new System.Drawing.Point(55, 33);
            this.cirProgBarWork.MarqueeAnimationSpeed = 2000;
            this.cirProgBarWork.Name = "cirProgBarWork";
            this.cirProgBarWork.OuterColor = System.Drawing.Color.Gray;
            this.cirProgBarWork.OuterMargin = -25;
            this.cirProgBarWork.OuterWidth = 26;
            this.cirProgBarWork.ProgressColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.cirProgBarWork.ProgressWidth = 25;
            this.cirProgBarWork.SecondaryFont = new System.Drawing.Font("Microsoft YaHei UI", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarWork.Size = new System.Drawing.Size(305, 305);
            this.cirProgBarWork.StartAngle = 270;
            this.cirProgBarWork.SubscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarWork.SubscriptMargin = new System.Windows.Forms.Padding(10, -35, 0, 0);
            this.cirProgBarWork.SubscriptText = "";
            this.cirProgBarWork.SuperscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarWork.SuperscriptMargin = new System.Windows.Forms.Padding(-40, 0, 0, 0);
            this.cirProgBarWork.SuperscriptText = "Work";
            this.cirProgBarWork.TabIndex = 0;
            this.cirProgBarWork.Text = "6000";
            this.cirProgBarWork.TextMargin = new System.Windows.Forms.Padding(8, 8, 0, 0);
            this.cirProgBarWork.Value = 68;
            // 
            // txtRepTime
            // 
            this.txtRepTime.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtRepTime.Location = new System.Drawing.Point(55, 430);
            this.txtRepTime.Name = "txtRepTime";
            this.txtRepTime.Size = new System.Drawing.Size(120, 37);
            this.txtRepTime.TabIndex = 1;
            // 
            // btnAccept
            // 
            this.btnAccept.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAccept.Location = new System.Drawing.Point(193, 504);
            this.btnAccept.Name = "btnAccept";
            this.btnAccept.Size = new System.Drawing.Size(136, 57);
            this.btnAccept.TabIndex = 2;
            this.btnAccept.Text = "接受挑戰";
            this.btnAccept.UseVisualStyleBackColor = true;
            this.btnAccept.Click += new System.EventHandler(this.btnAccept_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(49, 384);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(124, 31);
            this.label1.TabIndex = 3;
            this.label1.Text = "循環數(次)";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(49, 478);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(147, 31);
            this.label2.TabIndex = 5;
            this.label2.Text = "任務時長(秒)";
            // 
            // txtCntDownSec
            // 
            this.txtCntDownSec.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCntDownSec.Location = new System.Drawing.Point(55, 524);
            this.txtCntDownSec.Name = "txtCntDownSec";
            this.txtCntDownSec.Size = new System.Drawing.Size(120, 37);
            this.txtCntDownSec.TabIndex = 4;
            // 
            // button2
            // 
            this.button2.Font = new System.Drawing.Font("Microsoft YaHei UI", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button2.Location = new System.Drawing.Point(55, 591);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(172, 57);
            this.button2.TabIndex = 6;
            this.button2.Text = "暫停/接續";
            this.button2.UseVisualStyleBackColor = true;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.Location = new System.Drawing.Point(947, 75);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(83, 31);
            this.label3.TabIndex = 7;
            this.label3.Text = "使用者";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(803, 133);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(106, 31);
            this.label4.TabIndex = 8;
            this.label4.Text = "目前績分";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label5.Location = new System.Drawing.Point(803, 208);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(106, 31);
            this.label5.TabIndex = 9;
            this.label5.Text = "下一等級";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Microsoft YaHei UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.ForeColor = System.Drawing.Color.Green;
            this.label6.Location = new System.Drawing.Point(750, 416);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(230, 27);
            this.label6.TabIndex = 10;
            this.label6.Text = "DreamClock 剛剛敲你…";
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // textBox3
            // 
            this.textBox3.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox3.Location = new System.Drawing.Point(755, 460);
            this.textBox3.Multiline = true;
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(299, 114);
            this.textBox3.TabIndex = 12;
            // 
            // progressBar1
            // 
            this.progressBar1.Location = new System.Drawing.Point(809, 249);
            this.progressBar1.Name = "progressBar1";
            this.progressBar1.Size = new System.Drawing.Size(238, 23);
            this.progressBar1.TabIndex = 13;
            // 
            // progressBar2
            // 
            this.progressBar2.Location = new System.Drawing.Point(809, 180);
            this.progressBar2.Name = "progressBar2";
            this.progressBar2.Size = new System.Drawing.Size(238, 23);
            this.progressBar2.TabIndex = 14;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Microsoft YaHei UI", 13.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.Location = new System.Drawing.Point(889, 34);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(83, 31);
            this.label7.TabIndex = 15;
            this.label7.Text = "親愛的";
            // 
            // button3
            // 
            this.button3.Font = new System.Drawing.Font("Microsoft YaHei UI", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button3.Location = new System.Drawing.Point(253, 591);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(136, 57);
            this.button3.TabIndex = 16;
            this.button3.Text = "重置";
            this.button3.UseVisualStyleBackColor = true;
            // 
            // timerWork
            // 
            this.timerWork.Interval = 1000;
            this.timerWork.Tick += new System.EventHandler(this.timer_Tick);
            // 
            // cirProgBarRest
            // 
            this.cirProgBarRest.AnimationFunction = WinFormAnimation.KnownAnimationFunctions.Liner;
            this.cirProgBarRest.AnimationSpeed = 500;
            this.cirProgBarRest.BackColor = System.Drawing.Color.Transparent;
            this.cirProgBarRest.Font = new System.Drawing.Font("Microsoft Sans Serif", 40F, System.Drawing.FontStyle.Bold);
            this.cirProgBarRest.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.cirProgBarRest.InnerColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.cirProgBarRest.InnerMargin = 2;
            this.cirProgBarRest.InnerWidth = -1;
            this.cirProgBarRest.Location = new System.Drawing.Point(416, 101);
            this.cirProgBarRest.MarqueeAnimationSpeed = 2000;
            this.cirProgBarRest.Name = "cirProgBarRest";
            this.cirProgBarRest.OuterColor = System.Drawing.Color.Gray;
            this.cirProgBarRest.OuterMargin = -25;
            this.cirProgBarRest.OuterWidth = 26;
            this.cirProgBarRest.ProgressColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(128)))), ((int)(((byte)(255)))));
            this.cirProgBarRest.ProgressWidth = 25;
            this.cirProgBarRest.SecondaryFont = new System.Drawing.Font("Microsoft YaHei UI", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarRest.Size = new System.Drawing.Size(244, 238);
            this.cirProgBarRest.StartAngle = 270;
            this.cirProgBarRest.SubscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarRest.SubscriptMargin = new System.Windows.Forms.Padding(10, -35, 0, 0);
            this.cirProgBarRest.SubscriptText = "";
            this.cirProgBarRest.SuperscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarRest.SuperscriptMargin = new System.Windows.Forms.Padding(-30, 0, 0, 0);
            this.cirProgBarRest.SuperscriptText = "Rest";
            this.cirProgBarRest.TabIndex = 17;
            this.cirProgBarRest.Text = "6000";
            this.cirProgBarRest.TextMargin = new System.Windows.Forms.Padding(8, 8, 0, 0);
            this.cirProgBarRest.Value = 68;
            // 
            // timerRest
            // 
            this.timerRest.Interval = 1000;
            this.timerRest.Tick += new System.EventHandler(this.timerRest_Tick);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1134, 659);
            this.Controls.Add(this.cirProgBarRest);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.progressBar2);
            this.Controls.Add(this.progressBar1);
            this.Controls.Add(this.textBox3);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtCntDownSec);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnAccept);
            this.Controls.Add(this.txtRepTime);
            this.Controls.Add(this.cirProgBarWork);
            this.Name = "MainForm";
            this.Text = "Main Form";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private CircularProgressBar.CircularProgressBar cirProgBarWork;
        private System.Windows.Forms.TextBox txtRepTime;
        private System.Windows.Forms.Button btnAccept;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtCntDownSec;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.TextBox textBox3;
        private System.Windows.Forms.ProgressBar progressBar1;
        private System.Windows.Forms.ProgressBar progressBar2;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Button button3;
        private System.Windows.Forms.Timer timerWork;
        private CircularProgressBar.CircularProgressBar cirProgBarRest;
        private System.Windows.Forms.Timer timerRest;
    }
}

