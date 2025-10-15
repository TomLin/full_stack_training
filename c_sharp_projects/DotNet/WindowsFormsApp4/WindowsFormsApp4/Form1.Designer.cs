namespace WindowsFormsApp4
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
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabPage1 = new System.Windows.Forms.TabPage();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.tabPage3 = new System.Windows.Forms.TabPage();
            this.txt訂購人 = new System.Windows.Forms.TextBox();
            this.chk外帶 = new System.Windows.Forms.CheckBox();
            this.chk需買購物袋 = new System.Windows.Forms.CheckBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.btn查看購物車 = new System.Windows.Forms.Button();
            this.lbl購物車資訊 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.btn加入購物車 = new System.Windows.Forms.Button();
            this.lbl單品總價 = new System.Windows.Forms.Label();
            this.lbl飲料單價 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.listBox飲料品項 = new System.Windows.Forms.ListBox();
            this.comboBox甜度 = new System.Windows.Forms.ComboBox();
            this.comboBox冰塊 = new System.Windows.Forms.ComboBox();
            this.comboBox加料 = new System.Windows.Forms.ComboBox();
            this.txt杯 = new System.Windows.Forms.TextBox();
            this.btn加一杯 = new System.Windows.Forms.Button();
            this.btn減一杯 = new System.Windows.Forms.Button();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Controls.Add(this.tabPage3);
            this.tabControl1.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.tabControl1.Location = new System.Drawing.Point(28, 100);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(509, 421);
            this.tabControl1.TabIndex = 0;
            // 
            // tabPage1
            // 
            this.tabPage1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(224)))), ((int)(((byte)(192)))));
            this.tabPage1.Controls.Add(this.btn減一杯);
            this.tabPage1.Controls.Add(this.btn加一杯);
            this.tabPage1.Controls.Add(this.txt杯);
            this.tabPage1.Controls.Add(this.comboBox加料);
            this.tabPage1.Controls.Add(this.comboBox冰塊);
            this.tabPage1.Controls.Add(this.comboBox甜度);
            this.tabPage1.Controls.Add(this.listBox飲料品項);
            this.tabPage1.Controls.Add(this.label13);
            this.tabPage1.Controls.Add(this.btn加入購物車);
            this.tabPage1.Controls.Add(this.lbl單品總價);
            this.tabPage1.Controls.Add(this.lbl飲料單價);
            this.tabPage1.Controls.Add(this.label10);
            this.tabPage1.Controls.Add(this.label9);
            this.tabPage1.Controls.Add(this.label8);
            this.tabPage1.Controls.Add(this.label7);
            this.tabPage1.Controls.Add(this.label6);
            this.tabPage1.Controls.Add(this.label5);
            this.tabPage1.Controls.Add(this.label4);
            this.tabPage1.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.tabPage1.Location = new System.Drawing.Point(4, 29);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage1.Size = new System.Drawing.Size(501, 388);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "飲料";
            // 
            // tabPage2
            // 
            this.tabPage2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.tabPage2.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.tabPage2.Location = new System.Drawing.Point(4, 29);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage2.Size = new System.Drawing.Size(501, 388);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "點心";
            // 
            // tabPage3
            // 
            this.tabPage3.Location = new System.Drawing.Point(4, 29);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Size = new System.Drawing.Size(501, 388);
            this.tabPage3.TabIndex = 2;
            this.tabPage3.Text = "tabPage3";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // txt訂購人
            // 
            this.txt訂購人.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.txt訂購人.Location = new System.Drawing.Point(81, 29);
            this.txt訂購人.Name = "txt訂購人";
            this.txt訂購人.Size = new System.Drawing.Size(119, 29);
            this.txt訂購人.TabIndex = 1;
            // 
            // chk外帶
            // 
            this.chk外帶.AutoSize = true;
            this.chk外帶.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.chk外帶.Location = new System.Drawing.Point(225, 37);
            this.chk外帶.Name = "chk外帶";
            this.chk外帶.Size = new System.Drawing.Size(76, 24);
            this.chk外帶.TabIndex = 2;
            this.chk外帶.Text = "需外帶";
            this.chk外帶.UseVisualStyleBackColor = true;
            this.chk外帶.CheckedChanged += new System.EventHandler(this.chk外帶_CheckedChanged);
            // 
            // chk需買購物袋
            // 
            this.chk需買購物袋.AutoSize = true;
            this.chk需買購物袋.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.chk需買購物袋.Location = new System.Drawing.Point(307, 37);
            this.chk需買購物袋.Name = "chk需買購物袋";
            this.chk需買購物袋.Size = new System.Drawing.Size(108, 24);
            this.chk需買購物袋.TabIndex = 3;
            this.chk需買購物袋.Text = "需買購物袋";
            this.chk需買購物袋.UseVisualStyleBackColor = true;
            this.chk需買購物袋.CheckedChanged += new System.EventHandler(this.chk需買購物袋_CheckedChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.label1.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label1.Location = new System.Drawing.Point(12, 37);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(57, 20);
            this.label1.TabIndex = 4;
            this.label1.Text = "訂購人";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.BackColor = System.Drawing.Color.Transparent;
            this.label2.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label2.Location = new System.Drawing.Point(432, 31);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(39, 30);
            this.label2.TabIndex = 5;
            this.label2.Text = "🚐";
            // 
            // btn查看購物車
            // 
            this.btn查看購物車.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.btn查看購物車.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn查看購物車.Location = new System.Drawing.Point(376, 76);
            this.btn查看購物車.Name = "btn查看購物車";
            this.btn查看購物車.Size = new System.Drawing.Size(154, 38);
            this.btn查看購物車.TabIndex = 6;
            this.btn查看購物車.Text = "查看購物車結帳";
            this.btn查看購物車.UseVisualStyleBackColor = false;
            this.btn查看購物車.Click += new System.EventHandler(this.btn查看購物車_Click);
            // 
            // lbl購物車資訊
            // 
            this.lbl購物車資訊.AutoSize = true;
            this.lbl購物車資訊.BackColor = System.Drawing.Color.Transparent;
            this.lbl購物車資訊.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl購物車資訊.Location = new System.Drawing.Point(477, 31);
            this.lbl購物車資訊.Name = "lbl購物車資訊";
            this.lbl購物車資訊.Size = new System.Drawing.Size(27, 30);
            this.lbl購物車資訊.TabIndex = 7;
            this.lbl購物車資訊.Text = "0";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.BackColor = System.Drawing.Color.Transparent;
            this.label13.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label13.Location = new System.Drawing.Point(122, 278);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(37, 30);
            this.label13.TabIndex = 40;
            this.label13.Text = "杯";
            // 
            // btn加入購物車
            // 
            this.btn加入購物車.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(128)))));
            this.btn加入購物車.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn加入購物車.Location = new System.Drawing.Point(330, 333);
            this.btn加入購物車.Name = "btn加入購物車";
            this.btn加入購物車.Size = new System.Drawing.Size(154, 38);
            this.btn加入購物車.TabIndex = 30;
            this.btn加入購物車.Text = "加入購物車";
            this.btn加入購物車.UseVisualStyleBackColor = false;
            this.btn加入購物車.Click += new System.EventHandler(this.btn加入購物車_Click);
            // 
            // lbl單品總價
            // 
            this.lbl單品總價.AutoSize = true;
            this.lbl單品總價.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.lbl單品總價.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl單品總價.Location = new System.Drawing.Point(341, 278);
            this.lbl單品總價.Name = "lbl單品總價";
            this.lbl單品總價.Size = new System.Drawing.Size(107, 30);
            this.lbl單品總價.TabIndex = 39;
            this.lbl單品總價.Text = "00000元";
            // 
            // lbl飲料單價
            // 
            this.lbl飲料單價.AutoSize = true;
            this.lbl飲料單價.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.lbl飲料單價.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl飲料單價.Location = new System.Drawing.Point(223, 278);
            this.lbl飲料單價.Name = "lbl飲料單價";
            this.lbl飲料單價.Size = new System.Drawing.Size(79, 30);
            this.lbl飲料單價.TabIndex = 38;
            this.lbl飲料單價.Text = "000元";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.BackColor = System.Drawing.Color.Transparent;
            this.label10.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label10.Location = new System.Drawing.Point(339, 233);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(109, 30);
            this.label10.TabIndex = 37;
            this.label10.Text = "單品總價";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.BackColor = System.Drawing.Color.Transparent;
            this.label9.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label9.Location = new System.Drawing.Point(221, 233);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(61, 30);
            this.label9.TabIndex = 36;
            this.label9.Text = "單價";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.BackColor = System.Drawing.Color.Transparent;
            this.label8.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label8.Location = new System.Drawing.Point(249, 161);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(61, 30);
            this.label8.TabIndex = 35;
            this.label8.Text = "加料";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.BackColor = System.Drawing.Color.Transparent;
            this.label7.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label7.Location = new System.Drawing.Point(249, 90);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(61, 30);
            this.label7.TabIndex = 34;
            this.label7.Text = "冰塊";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.BackColor = System.Drawing.Color.Transparent;
            this.label6.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label6.Location = new System.Drawing.Point(249, 17);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(61, 30);
            this.label6.TabIndex = 33;
            this.label6.Text = "甜度";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.BackColor = System.Drawing.Color.Transparent;
            this.label5.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label5.Location = new System.Drawing.Point(50, 233);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(61, 30);
            this.label5.TabIndex = 32;
            this.label5.Text = "數量";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.BackColor = System.Drawing.Color.Transparent;
            this.label4.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label4.Location = new System.Drawing.Point(16, 17);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(109, 30);
            this.label4.TabIndex = 31;
            this.label4.Text = "飲料品項";
            // 
            // listBox飲料品項
            // 
            this.listBox飲料品項.FormattingEnabled = true;
            this.listBox飲料品項.ItemHeight = 20;
            this.listBox飲料品項.Location = new System.Drawing.Point(21, 67);
            this.listBox飲料品項.Name = "listBox飲料品項";
            this.listBox飲料品項.Size = new System.Drawing.Size(179, 124);
            this.listBox飲料品項.TabIndex = 41;
            this.listBox飲料品項.SelectedIndexChanged += new System.EventHandler(this.listBox飲料品項_SelectedIndexChanged);
            // 
            // comboBox甜度
            // 
            this.comboBox甜度.FormattingEnabled = true;
            this.comboBox甜度.Location = new System.Drawing.Point(316, 17);
            this.comboBox甜度.Name = "comboBox甜度";
            this.comboBox甜度.Size = new System.Drawing.Size(121, 28);
            this.comboBox甜度.TabIndex = 42;
            this.comboBox甜度.SelectedIndexChanged += new System.EventHandler(this.comboBox甜度_SelectedIndexChanged);
            // 
            // comboBox冰塊
            // 
            this.comboBox冰塊.FormattingEnabled = true;
            this.comboBox冰塊.Location = new System.Drawing.Point(316, 90);
            this.comboBox冰塊.Name = "comboBox冰塊";
            this.comboBox冰塊.Size = new System.Drawing.Size(121, 28);
            this.comboBox冰塊.TabIndex = 43;
            this.comboBox冰塊.SelectedIndexChanged += new System.EventHandler(this.comboBox冰塊_SelectedIndexChanged);
            // 
            // comboBox加料
            // 
            this.comboBox加料.FormattingEnabled = true;
            this.comboBox加料.Location = new System.Drawing.Point(316, 161);
            this.comboBox加料.Name = "comboBox加料";
            this.comboBox加料.Size = new System.Drawing.Size(121, 28);
            this.comboBox加料.TabIndex = 44;
            this.comboBox加料.SelectedIndexChanged += new System.EventHandler(this.comboBox加料_SelectedIndexChanged);
            // 
            // txt杯
            // 
            this.txt杯.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.txt杯.Location = new System.Drawing.Point(21, 279);
            this.txt杯.Name = "txt杯";
            this.txt杯.Size = new System.Drawing.Size(104, 29);
            this.txt杯.TabIndex = 8;
            this.txt杯.TextChanged += new System.EventHandler(this.txt杯_TextChanged);
            // 
            // btn加一杯
            // 
            this.btn加一杯.BackColor = System.Drawing.Color.Lime;
            this.btn加一杯.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn加一杯.Location = new System.Drawing.Point(21, 323);
            this.btn加一杯.Name = "btn加一杯";
            this.btn加一杯.Size = new System.Drawing.Size(48, 38);
            this.btn加一杯.TabIndex = 8;
            this.btn加一杯.Text = "＋";
            this.btn加一杯.UseVisualStyleBackColor = false;
            this.btn加一杯.Click += new System.EventHandler(this.btn加一杯_Click);
            // 
            // btn減一杯
            // 
            this.btn減一杯.BackColor = System.Drawing.Color.Lime;
            this.btn減一杯.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn減一杯.Location = new System.Drawing.Point(75, 323);
            this.btn減一杯.Name = "btn減一杯";
            this.btn減一杯.Size = new System.Drawing.Size(48, 38);
            this.btn減一杯.TabIndex = 45;
            this.btn減一杯.Text = "－";
            this.btn減一杯.UseVisualStyleBackColor = false;
            this.btn減一杯.Click += new System.EventHandler(this.btn減一杯_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.ClientSize = new System.Drawing.Size(566, 566);
            this.Controls.Add(this.lbl購物車資訊);
            this.Controls.Add(this.btn查看購物車);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.chk需買購物袋);
            this.Controls.Add(this.chk外帶);
            this.Controls.Add(this.txt訂購人);
            this.Controls.Add(this.tabControl1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Name = "Form1";
            this.Text = "喝得到飲料訂購單";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabPage1;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.TabPage tabPage3;
        private System.Windows.Forms.TextBox txt訂購人;
        private System.Windows.Forms.CheckBox chk外帶;
        private System.Windows.Forms.CheckBox chk需買購物袋;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btn查看購物車;
        private System.Windows.Forms.Label lbl購物車資訊;
        private System.Windows.Forms.Button btn加一杯;
        private System.Windows.Forms.TextBox txt杯;
        private System.Windows.Forms.ComboBox comboBox加料;
        private System.Windows.Forms.ComboBox comboBox冰塊;
        private System.Windows.Forms.ComboBox comboBox甜度;
        private System.Windows.Forms.ListBox listBox飲料品項;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Button btn加入購物車;
        private System.Windows.Forms.Label lbl單品總價;
        private System.Windows.Forms.Label lbl飲料單價;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Button btn減一杯;
    }
}

