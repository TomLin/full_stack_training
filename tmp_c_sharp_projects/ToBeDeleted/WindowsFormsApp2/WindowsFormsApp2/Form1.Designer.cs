namespace WindowsFormsApp2
{
    partial class Form1
    {
        /// <summary>
        /// 設計工具所需的變數。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清除任何使用中的資源。
        /// </summary>
        /// <param name="disposing">如果應該處置受控資源則為 true，否則為 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form 設計工具產生的程式碼

        /// <summary>
        /// 此為設計工具支援所需的方法 - 請勿使用程式碼編輯器修改
        /// 這個方法的內容。
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.txt公分 = new System.Windows.Forms.TextBox();
            this.txt坪 = new System.Windows.Forms.TextBox();
            this.txt公斤 = new System.Windows.Forms.TextBox();
            this.txt英吋 = new System.Windows.Forms.TextBox();
            this.txt平方公尺 = new System.Windows.Forms.TextBox();
            this.txt磅 = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.btn公分轉英吋 = new System.Windows.Forms.Button();
            this.btn英吋轉公分 = new System.Windows.Forms.Button();
            this.btn平方公尺轉坪 = new System.Windows.Forms.Button();
            this.btn坪轉平方公尺 = new System.Windows.Forms.Button();
            this.btn磅轉公斤 = new System.Windows.Forms.Button();
            this.btn公斤轉磅 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("新細明體", 20F);
            this.label1.Location = new System.Drawing.Point(39, 30);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(147, 27);
            this.label1.TabIndex = 0;
            this.label1.Text = "公分轉英吋";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("新細明體", 20F);
            this.label2.Location = new System.Drawing.Point(39, 136);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(201, 27);
            this.label2.TabIndex = 1;
            this.label2.Text = "坪數轉平方公尺";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("新細明體", 20F);
            this.label3.Location = new System.Drawing.Point(39, 244);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(120, 27);
            this.label3.TabIndex = 2;
            this.label3.Text = "公斤轉磅";
            // 
            // txt公分
            // 
            this.txt公分.Location = new System.Drawing.Point(44, 72);
            this.txt公分.Name = "txt公分";
            this.txt公分.Size = new System.Drawing.Size(172, 22);
            this.txt公分.TabIndex = 3;
            // 
            // txt坪
            // 
            this.txt坪.Location = new System.Drawing.Point(44, 181);
            this.txt坪.Name = "txt坪";
            this.txt坪.Size = new System.Drawing.Size(172, 22);
            this.txt坪.TabIndex = 4;
            // 
            // txt公斤
            // 
            this.txt公斤.Location = new System.Drawing.Point(44, 289);
            this.txt公斤.Name = "txt公斤";
            this.txt公斤.Size = new System.Drawing.Size(172, 22);
            this.txt公斤.TabIndex = 5;
            // 
            // txt英吋
            // 
            this.txt英吋.Location = new System.Drawing.Point(372, 72);
            this.txt英吋.Name = "txt英吋";
            this.txt英吋.Size = new System.Drawing.Size(172, 22);
            this.txt英吋.TabIndex = 6;
            // 
            // txt平方公尺
            // 
            this.txt平方公尺.Location = new System.Drawing.Point(372, 181);
            this.txt平方公尺.Name = "txt平方公尺";
            this.txt平方公尺.Size = new System.Drawing.Size(172, 22);
            this.txt平方公尺.TabIndex = 7;
            // 
            // txt磅
            // 
            this.txt磅.Location = new System.Drawing.Point(372, 292);
            this.txt磅.Name = "txt磅";
            this.txt磅.Size = new System.Drawing.Size(172, 22);
            this.txt磅.TabIndex = 8;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("新細明體", 14F);
            this.label4.Location = new System.Drawing.Point(237, 75);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(47, 19);
            this.label4.TabIndex = 9;
            this.label4.Text = "公分";
            this.label4.Click += new System.EventHandler(this.label4_Click);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("新細明體", 14F);
            this.label5.Location = new System.Drawing.Point(237, 183);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(28, 19);
            this.label5.TabIndex = 10;
            this.label5.Text = "坪";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("新細明體", 14F);
            this.label6.Location = new System.Drawing.Point(237, 290);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(47, 19);
            this.label6.TabIndex = 11;
            this.label6.Text = "公斤";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("新細明體", 14F);
            this.label7.Location = new System.Drawing.Point(565, 75);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(47, 19);
            this.label7.TabIndex = 12;
            this.label7.Text = "英吋";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("新細明體", 14F);
            this.label8.Location = new System.Drawing.Point(565, 184);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(85, 19);
            this.label8.TabIndex = 13;
            this.label8.Text = "平方公尺";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("新細明體", 14F);
            this.label9.Location = new System.Drawing.Point(565, 292);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(28, 19);
            this.label9.TabIndex = 14;
            this.label9.Text = "磅";
            // 
            // btn公分轉英吋
            // 
            this.btn公分轉英吋.Location = new System.Drawing.Point(288, 55);
            this.btn公分轉英吋.Name = "btn公分轉英吋";
            this.btn公分轉英吋.Size = new System.Drawing.Size(75, 23);
            this.btn公分轉英吋.TabIndex = 15;
            this.btn公分轉英吋.Text = "-->";
            this.btn公分轉英吋.UseVisualStyleBackColor = true;
            this.btn公分轉英吋.Click += new System.EventHandler(this.btn公分轉英吋_Click);
            // 
            // btn英吋轉公分
            // 
            this.btn英吋轉公分.Location = new System.Drawing.Point(290, 88);
            this.btn英吋轉公分.Name = "btn英吋轉公分";
            this.btn英吋轉公分.Size = new System.Drawing.Size(75, 23);
            this.btn英吋轉公分.TabIndex = 16;
            this.btn英吋轉公分.Text = "<--";
            this.btn英吋轉公分.UseVisualStyleBackColor = true;
            // 
            // btn平方公尺轉坪
            // 
            this.btn平方公尺轉坪.Location = new System.Drawing.Point(288, 194);
            this.btn平方公尺轉坪.Name = "btn平方公尺轉坪";
            this.btn平方公尺轉坪.Size = new System.Drawing.Size(75, 23);
            this.btn平方公尺轉坪.TabIndex = 18;
            this.btn平方公尺轉坪.Text = "<--";
            this.btn平方公尺轉坪.UseVisualStyleBackColor = true;
            // 
            // btn坪轉平方公尺
            // 
            this.btn坪轉平方公尺.Location = new System.Drawing.Point(286, 161);
            this.btn坪轉平方公尺.Name = "btn坪轉平方公尺";
            this.btn坪轉平方公尺.Size = new System.Drawing.Size(75, 23);
            this.btn坪轉平方公尺.TabIndex = 17;
            this.btn坪轉平方公尺.Text = "-->";
            this.btn坪轉平方公尺.UseVisualStyleBackColor = true;
            this.btn坪轉平方公尺.Click += new System.EventHandler(this.btn坪轉平方公尺_Click);
            // 
            // btn磅轉公斤
            // 
            this.btn磅轉公斤.Location = new System.Drawing.Point(288, 307);
            this.btn磅轉公斤.Name = "btn磅轉公斤";
            this.btn磅轉公斤.Size = new System.Drawing.Size(75, 23);
            this.btn磅轉公斤.TabIndex = 20;
            this.btn磅轉公斤.Text = "<-- ";
            this.btn磅轉公斤.UseVisualStyleBackColor = true;
            // 
            // btn公斤轉磅
            // 
            this.btn公斤轉磅.Location = new System.Drawing.Point(286, 274);
            this.btn公斤轉磅.Name = "btn公斤轉磅";
            this.btn公斤轉磅.Size = new System.Drawing.Size(75, 23);
            this.btn公斤轉磅.TabIndex = 19;
            this.btn公斤轉磅.Text = "-->";
            this.btn公斤轉磅.UseVisualStyleBackColor = true;
            this.btn公斤轉磅.Click += new System.EventHandler(this.btn公斤轉磅_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btn磅轉公斤);
            this.Controls.Add(this.btn公斤轉磅);
            this.Controls.Add(this.btn平方公尺轉坪);
            this.Controls.Add(this.btn坪轉平方公尺);
            this.Controls.Add(this.btn英吋轉公分);
            this.Controls.Add(this.btn公分轉英吋);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.txt磅);
            this.Controls.Add(this.txt平方公尺);
            this.Controls.Add(this.txt英吋);
            this.Controls.Add(this.txt公斤);
            this.Controls.Add(this.txt坪);
            this.Controls.Add(this.txt公分);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txt公分;
        private System.Windows.Forms.TextBox txt坪;
        private System.Windows.Forms.TextBox txt公斤;
        private System.Windows.Forms.TextBox txt英吋;
        private System.Windows.Forms.TextBox txt平方公尺;
        private System.Windows.Forms.TextBox txt磅;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Button btn公分轉英吋;
        private System.Windows.Forms.Button btn英吋轉公分;
        private System.Windows.Forms.Button btn平方公尺轉坪;
        private System.Windows.Forms.Button btn坪轉平方公尺;
        private System.Windows.Forms.Button btn磅轉公斤;
        private System.Windows.Forms.Button btn公斤轉磅;
    }
}

