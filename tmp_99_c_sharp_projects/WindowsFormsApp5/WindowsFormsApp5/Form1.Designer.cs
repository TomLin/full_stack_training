namespace WindowsFormsApp5
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
            this.txt查詢結果 = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.lbl成績總和 = new System.Windows.Forms.Label();
            this.lbl成績平均 = new System.Windows.Forms.Label();
            this.btn姓名排序 = new System.Windows.Forms.Button();
            this.btn成績排序 = new System.Windows.Forms.Button();
            this.btn所有學生成績 = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.btn姓名搜尋 = new System.Windows.Forms.Button();
            this.txt搜尋關鍵字 = new System.Windows.Forms.TextBox();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("微軟正黑體", 19.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label1.Location = new System.Drawing.Point(249, 7);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(177, 35);
            this.label1.TabIndex = 0;
            this.label1.Text = "學生成績查詢";
            // 
            // txt查詢結果
            // 
            this.txt查詢結果.BackColor = System.Drawing.Color.Green;
            this.txt查詢結果.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.txt查詢結果.ForeColor = System.Drawing.Color.White;
            this.txt查詢結果.Location = new System.Drawing.Point(31, 53);
            this.txt查詢結果.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txt查詢結果.Multiline = true;
            this.txt查詢結果.Name = "txt查詢結果";
            this.txt查詢結果.RightToLeft = System.Windows.Forms.RightToLeft.No;
            this.txt查詢結果.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txt查詢結果.Size = new System.Drawing.Size(502, 330);
            this.txt查詢結果.TabIndex = 1;
            this.txt查詢結果.Text = "查詢結果";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label2.Location = new System.Drawing.Point(562, 228);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(109, 30);
            this.label2.TabIndex = 2;
            this.label2.Text = "成績總和";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label3.Location = new System.Drawing.Point(562, 306);
            this.label3.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(109, 30);
            this.label3.TabIndex = 3;
            this.label3.Text = "成績平均";
            // 
            // lbl成績總和
            // 
            this.lbl成績總和.AutoSize = true;
            this.lbl成績總和.BackColor = System.Drawing.Color.Green;
            this.lbl成績總和.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl成績總和.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lbl成績總和.Location = new System.Drawing.Point(562, 269);
            this.lbl成績總和.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbl成績總和.Name = "lbl成績總和";
            this.lbl成績總和.Size = new System.Drawing.Size(41, 30);
            this.lbl成績總和.TabIndex = 4;
            this.lbl成績總和.Text = "00";
            // 
            // lbl成績平均
            // 
            this.lbl成績平均.AutoSize = true;
            this.lbl成績平均.BackColor = System.Drawing.Color.Green;
            this.lbl成績平均.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl成績平均.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lbl成績平均.Location = new System.Drawing.Point(562, 345);
            this.lbl成績平均.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.lbl成績平均.Name = "lbl成績平均";
            this.lbl成績平均.Size = new System.Drawing.Size(61, 30);
            this.lbl成績平均.TabIndex = 5;
            this.lbl成績平均.Text = "00.0";
            // 
            // btn姓名排序
            // 
            this.btn姓名排序.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn姓名排序.ForeColor = System.Drawing.Color.Blue;
            this.btn姓名排序.Location = new System.Drawing.Point(31, 407);
            this.btn姓名排序.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btn姓名排序.Name = "btn姓名排序";
            this.btn姓名排序.Size = new System.Drawing.Size(139, 48);
            this.btn姓名排序.TabIndex = 6;
            this.btn姓名排序.Text = "姓名排序";
            this.btn姓名排序.UseVisualStyleBackColor = true;
            this.btn姓名排序.Click += new System.EventHandler(this.btn姓名排序_Click);
            // 
            // btn成績排序
            // 
            this.btn成績排序.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn成績排序.ForeColor = System.Drawing.Color.Green;
            this.btn成績排序.Location = new System.Drawing.Point(174, 407);
            this.btn成績排序.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btn成績排序.Name = "btn成績排序";
            this.btn成績排序.Size = new System.Drawing.Size(139, 48);
            this.btn成績排序.TabIndex = 7;
            this.btn成績排序.Text = "成績排序";
            this.btn成績排序.UseVisualStyleBackColor = true;
            this.btn成績排序.Click += new System.EventHandler(this.btn成績排序_Click);
            // 
            // btn所有學生成績
            // 
            this.btn所有學生成績.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn所有學生成績.ForeColor = System.Drawing.Color.Purple;
            this.btn所有學生成績.Location = new System.Drawing.Point(31, 460);
            this.btn所有學生成績.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btn所有學生成績.Name = "btn所有學生成績";
            this.btn所有學生成績.Size = new System.Drawing.Size(211, 48);
            this.btn所有學生成績.TabIndex = 8;
            this.btn所有學生成績.Text = "所有學生成績";
            this.btn所有學生成績.UseVisualStyleBackColor = true;
            this.btn所有學生成績.Click += new System.EventHandler(this.btn所有學生成績_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btn姓名搜尋);
            this.groupBox1.Controls.Add(this.txt搜尋關鍵字);
            this.groupBox1.Font = new System.Drawing.Font("微軟正黑體", 16.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.groupBox1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.groupBox1.Location = new System.Drawing.Point(352, 407);
            this.groupBox1.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBox1.Size = new System.Drawing.Size(320, 135);
            this.groupBox1.TabIndex = 9;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "搜尋功能";
            // 
            // btn姓名搜尋
            // 
            this.btn姓名搜尋.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(64)))), ((int)(((byte)(0)))));
            this.btn姓名搜尋.Location = new System.Drawing.Point(146, 81);
            this.btn姓名搜尋.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btn姓名搜尋.Name = "btn姓名搜尋";
            this.btn姓名搜尋.Size = new System.Drawing.Size(142, 40);
            this.btn姓名搜尋.TabIndex = 1;
            this.btn姓名搜尋.Text = "姓名搜尋";
            this.btn姓名搜尋.UseVisualStyleBackColor = true;
            this.btn姓名搜尋.Click += new System.EventHandler(this.btn姓名搜尋_Click);
            // 
            // txt搜尋關鍵字
            // 
            this.txt搜尋關鍵字.Location = new System.Drawing.Point(37, 34);
            this.txt搜尋關鍵字.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txt搜尋關鍵字.Name = "txt搜尋關鍵字";
            this.txt搜尋關鍵字.Size = new System.Drawing.Size(252, 36);
            this.txt搜尋關鍵字.TabIndex = 0;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(64)))), ((int)(((byte)(0)))));
            this.ClientSize = new System.Drawing.Size(700, 560);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.btn所有學生成績);
            this.Controls.Add(this.btn成績排序);
            this.Controls.Add(this.btn姓名排序);
            this.Controls.Add(this.lbl成績平均);
            this.Controls.Add(this.lbl成績總和);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txt查詢結果);
            this.Controls.Add(this.label1);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txt查詢結果;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label lbl成績總和;
        private System.Windows.Forms.Label lbl成績平均;
        private System.Windows.Forms.Button btn姓名排序;
        private System.Windows.Forms.Button btn成績排序;
        private System.Windows.Forms.Button btn所有學生成績;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Button btn姓名搜尋;
        private System.Windows.Forms.TextBox txt搜尋關鍵字;
    }
}

