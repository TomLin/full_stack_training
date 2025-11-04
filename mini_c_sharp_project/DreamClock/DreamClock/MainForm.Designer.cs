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
            this.txtCylTime = new System.Windows.Forms.TextBox();
            this.btnStart = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.txtCntDownSec = new System.Windows.Forms.TextBox();
            this.button2 = new System.Windows.Forms.Button();
            this.lblAcct = new System.Windows.Forms.Label();
            this.lblPoints = new System.Windows.Forms.Label();
            this.lblTier = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.contextMenuStrip1 = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.label7 = new System.Windows.Forms.Label();
            this.button3 = new System.Windows.Forms.Button();
            this.timerWork = new System.Windows.Forms.Timer(this.components);
            this.cirProgBarRest = new CircularProgressBar.CircularProgressBar();
            this.timerRest = new System.Windows.Forms.Timer(this.components);
            this.lblCurPoints = new System.Windows.Forms.Label();
            this.lblCurTier = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // cirProgBarWork
            // 
            this.cirProgBarWork.AnimationFunction = WinFormAnimation.KnownAnimationFunctions.Liner;
            this.cirProgBarWork.AnimationSpeed = 500;
            this.cirProgBarWork.BackColor = System.Drawing.Color.Transparent;
            this.cirProgBarWork.Font = new System.Drawing.Font("Segoe Print", 36F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarWork.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.cirProgBarWork.InnerColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.cirProgBarWork.InnerMargin = 2;
            this.cirProgBarWork.InnerWidth = -1;
            this.cirProgBarWork.Location = new System.Drawing.Point(23, 27);
            this.cirProgBarWork.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.cirProgBarWork.MarqueeAnimationSpeed = 2000;
            this.cirProgBarWork.Name = "cirProgBarWork";
            this.cirProgBarWork.OuterColor = System.Drawing.Color.Gray;
            this.cirProgBarWork.OuterMargin = -25;
            this.cirProgBarWork.OuterWidth = 26;
            this.cirProgBarWork.ProgressColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.cirProgBarWork.ProgressWidth = 25;
            this.cirProgBarWork.SecondaryFont = new System.Drawing.Font("Segoe Print", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarWork.Size = new System.Drawing.Size(262, 262);
            this.cirProgBarWork.StartAngle = 270;
            this.cirProgBarWork.SubscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarWork.SubscriptMargin = new System.Windows.Forms.Padding(10, -35, 0, 0);
            this.cirProgBarWork.SubscriptText = "";
            this.cirProgBarWork.SuperscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarWork.SuperscriptMargin = new System.Windows.Forms.Padding(0);
            this.cirProgBarWork.SuperscriptText = "Work";
            this.cirProgBarWork.TabIndex = 0;
            this.cirProgBarWork.Text = "60";
            this.cirProgBarWork.TextMargin = new System.Windows.Forms.Padding(8, 5, 0, 0);
            this.cirProgBarWork.Value = 68;
            // 
            // txtCylTime
            // 
            this.txtCylTime.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCylTime.Location = new System.Drawing.Point(245, 354);
            this.txtCylTime.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txtCylTime.Name = "txtCylTime";
            this.txtCylTime.Size = new System.Drawing.Size(91, 41);
            this.txtCylTime.TabIndex = 1;
            // 
            // btnStart
            // 
            this.btnStart.BackColor = System.Drawing.Color.BlanchedAlmond;
            this.btnStart.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnStart.Location = new System.Drawing.Point(354, 404);
            this.btnStart.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnStart.Name = "btnStart";
            this.btnStart.Size = new System.Drawing.Size(102, 46);
            this.btnStart.TabIndex = 2;
            this.btnStart.Text = "Start";
            this.btnStart.UseVisualStyleBackColor = false;
            this.btnStart.Click += new System.EventHandler(this.btnStart_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(35, 357);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(150, 33);
            this.label1.TabIndex = 3;
            this.label1.Text = "Num. of Cycle";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.Location = new System.Drawing.Point(35, 411);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(197, 33);
            this.label2.TabIndex = 5;
            this.label2.Text = "Count Down (Sec.)";
            // 
            // txtCntDownSec
            // 
            this.txtCntDownSec.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCntDownSec.Location = new System.Drawing.Point(245, 408);
            this.txtCntDownSec.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txtCntDownSec.Name = "txtCntDownSec";
            this.txtCntDownSec.Size = new System.Drawing.Size(91, 41);
            this.txtCntDownSec.TabIndex = 4;
            // 
            // button2
            // 
            this.button2.BackColor = System.Drawing.Color.OldLace;
            this.button2.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button2.Location = new System.Drawing.Point(11, 480);
            this.button2.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(147, 46);
            this.button2.TabIndex = 6;
            this.button2.Text = "Pause/Cont.";
            this.button2.UseVisualStyleBackColor = false;
            // 
            // lblAcct
            // 
            this.lblAcct.AutoSize = true;
            this.lblAcct.Font = new System.Drawing.Font("Segoe Print", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblAcct.Location = new System.Drawing.Point(579, 60);
            this.lblAcct.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lblAcct.Name = "lblAcct";
            this.lblAcct.Size = new System.Drawing.Size(180, 42);
            this.lblAcct.TabIndex = 7;
            this.lblAcct.Text = "Account User";
            // 
            // lblPoints
            // 
            this.lblPoints.AutoSize = true;
            this.lblPoints.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblPoints.Location = new System.Drawing.Point(530, 115);
            this.lblPoints.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lblPoints.Name = "lblPoints";
            this.lblPoints.Size = new System.Drawing.Size(135, 33);
            this.lblPoints.TabIndex = 8;
            this.lblPoints.Text = "Accu. Points";
            // 
            // lblTier
            // 
            this.lblTier.AutoSize = true;
            this.lblTier.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblTier.Location = new System.Drawing.Point(530, 157);
            this.lblTier.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lblTier.Name = "lblTier";
            this.lblTier.Size = new System.Drawing.Size(139, 33);
            this.lblTier.TabIndex = 9;
            this.lblTier.Text = "Current Tier";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Segoe Print", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.ForeColor = System.Drawing.Color.Green;
            this.label6.Location = new System.Drawing.Point(531, 390);
            this.label6.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(256, 28);
            this.label6.TabIndex = 10;
            this.label6.Text = "DreamClock just pinged you ...";
            // 
            // contextMenuStrip1
            // 
            this.contextMenuStrip1.ImageScalingSize = new System.Drawing.Size(20, 20);
            this.contextMenuStrip1.Name = "contextMenuStrip1";
            this.contextMenuStrip1.Size = new System.Drawing.Size(61, 4);
            // 
            // textBox3
            // 
            this.textBox3.BackColor = System.Drawing.Color.Cornsilk;
            this.textBox3.Font = new System.Drawing.Font("Segoe Print", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox3.Location = new System.Drawing.Point(568, 420);
            this.textBox3.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.textBox3.Multiline = true;
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(225, 93);
            this.textBox3.TabIndex = 12;
            this.textBox3.Text = "Love Work and Enjoy Life";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.Location = new System.Drawing.Point(530, 27);
            this.label7.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(116, 33);
            this.label7.TabIndex = 15;
            this.label7.Text = "Good Day!";
            // 
            // button3
            // 
            this.button3.BackColor = System.Drawing.Color.OldLace;
            this.button3.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button3.Location = new System.Drawing.Point(171, 480);
            this.button3.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(102, 46);
            this.button3.TabIndex = 16;
            this.button3.Text = "Reset";
            this.button3.UseVisualStyleBackColor = false;
            // 
            // timerWork
            // 
            this.timerWork.Interval = 1000;
            this.timerWork.Tick += new System.EventHandler(this.timerWork_Tick);
            // 
            // cirProgBarRest
            // 
            this.cirProgBarRest.AnimationFunction = WinFormAnimation.KnownAnimationFunctions.Liner;
            this.cirProgBarRest.AnimationSpeed = 500;
            this.cirProgBarRest.BackColor = System.Drawing.Color.Transparent;
            this.cirProgBarRest.Font = new System.Drawing.Font("Segoe Print", 26.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarRest.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.cirProgBarRest.InnerColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.cirProgBarRest.InnerMargin = 2;
            this.cirProgBarRest.InnerWidth = -1;
            this.cirProgBarRest.Location = new System.Drawing.Point(300, 88);
            this.cirProgBarRest.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.cirProgBarRest.MarqueeAnimationSpeed = 2000;
            this.cirProgBarRest.Name = "cirProgBarRest";
            this.cirProgBarRest.OuterColor = System.Drawing.Color.Gray;
            this.cirProgBarRest.OuterMargin = -25;
            this.cirProgBarRest.OuterWidth = 26;
            this.cirProgBarRest.ProgressColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(128)))), ((int)(((byte)(255)))));
            this.cirProgBarRest.ProgressWidth = 25;
            this.cirProgBarRest.SecondaryFont = new System.Drawing.Font("Segoe Print", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.cirProgBarRest.Size = new System.Drawing.Size(201, 201);
            this.cirProgBarRest.StartAngle = 270;
            this.cirProgBarRest.SubscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarRest.SubscriptMargin = new System.Windows.Forms.Padding(10, -35, 0, 0);
            this.cirProgBarRest.SubscriptText = "";
            this.cirProgBarRest.SuperscriptColor = System.Drawing.Color.FromArgb(((int)(((byte)(166)))), ((int)(((byte)(166)))), ((int)(((byte)(166)))));
            this.cirProgBarRest.SuperscriptMargin = new System.Windows.Forms.Padding(0);
            this.cirProgBarRest.SuperscriptText = "Rest";
            this.cirProgBarRest.TabIndex = 17;
            this.cirProgBarRest.Text = "5";
            this.cirProgBarRest.TextMargin = new System.Windows.Forms.Padding(8, 5, 0, 0);
            this.cirProgBarRest.Value = 68;
            // 
            // timerRest
            // 
            this.timerRest.Interval = 1000;
            this.timerRest.Tick += new System.EventHandler(this.timerRest_Tick);
            // 
            // lblCurPoints
            // 
            this.lblCurPoints.AutoSize = true;
            this.lblCurPoints.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCurPoints.Location = new System.Drawing.Point(683, 115);
            this.lblCurPoints.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lblCurPoints.Name = "lblCurPoints";
            this.lblCurPoints.Size = new System.Drawing.Size(29, 33);
            this.lblCurPoints.TabIndex = 18;
            this.lblCurPoints.Text = "0";
            // 
            // lblCurTier
            // 
            this.lblCurTier.AutoSize = true;
            this.lblCurTier.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lblCurTier.Location = new System.Drawing.Point(680, 157);
            this.lblCurTier.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lblCurTier.Name = "lblCurTier";
            this.lblCurTier.Size = new System.Drawing.Size(107, 33);
            this.lblCurTier.TabIndex = 19;
            this.lblCurTier.Text = "Standard";
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Cornsilk;
            this.ClientSize = new System.Drawing.Size(816, 540);
            this.Controls.Add(this.lblCurTier);
            this.Controls.Add(this.lblCurPoints);
            this.Controls.Add(this.cirProgBarRest);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.textBox3);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.lblTier);
            this.Controls.Add(this.lblPoints);
            this.Controls.Add(this.lblAcct);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txtCntDownSec);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnStart);
            this.Controls.Add(this.txtCylTime);
            this.Controls.Add(this.cirProgBarWork);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "MainForm";
            this.Text = "Main Form";
            this.Activated += new System.EventHandler(this.MainForm_Activated);
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private CircularProgressBar.CircularProgressBar cirProgBarWork;
        private System.Windows.Forms.TextBox txtCylTime;
        private System.Windows.Forms.Button btnStart;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtCntDownSec;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Label lblAcct;
        private System.Windows.Forms.Label lblPoints;
        private System.Windows.Forms.Label lblTier;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ContextMenuStrip contextMenuStrip1;
        private System.Windows.Forms.TextBox textBox3;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Button button3;
        private System.Windows.Forms.Timer timerWork;
        private CircularProgressBar.CircularProgressBar cirProgBarRest;
        private System.Windows.Forms.Timer timerRest;
        private System.Windows.Forms.Label lblCurPoints;
        private System.Windows.Forms.Label lblCurTier;
    }
}

