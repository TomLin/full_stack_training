namespace WindowsFormsApp4
{
    partial class FormShoppingCart
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
            this.label1 = new System.Windows.Forms.Label();
            this.lbl訂購人資訊 = new System.Windows.Forms.Label();
            this.listBox訂購品項列表 = new System.Windows.Forms.ListBox();
            this.lbl外帶 = new System.Windows.Forms.Label();
            this.lbl買購物袋 = new System.Windows.Forms.Label();
            this.lbl訂單總價 = new System.Windows.Forms.Label();
            this.btn移除所選品項 = new System.Windows.Forms.Button();
            this.btn刪除所有品項 = new System.Windows.Forms.Button();
            this.btn輸出訂購單 = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.label1.Font = new System.Drawing.Font("微軟正黑體", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label1.Location = new System.Drawing.Point(23, 21);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(274, 27);
            this.label1.TabIndex = 5;
            this.label1.Text = "🚗🚗購物車 - 訂購品項列表";
            // 
            // lbl訂購人資訊
            // 
            this.lbl訂購人資訊.AutoSize = true;
            this.lbl訂購人資訊.BackColor = System.Drawing.Color.Transparent;
            this.lbl訂購人資訊.Font = new System.Drawing.Font("微軟正黑體", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl訂購人資訊.Location = new System.Drawing.Point(23, 65);
            this.lbl訂購人資訊.Name = "lbl訂購人資訊";
            this.lbl訂購人資訊.Size = new System.Drawing.Size(117, 27);
            this.lbl訂購人資訊.TabIndex = 32;
            this.lbl訂購人資訊.Text = "訂購人資訊";
            // 
            // listBox訂購品項列表
            // 
            this.listBox訂購品項列表.FormattingEnabled = true;
            this.listBox訂購品項列表.ItemHeight = 12;
            this.listBox訂購品項列表.Location = new System.Drawing.Point(28, 110);
            this.listBox訂購品項列表.Name = "listBox訂購品項列表";
            this.listBox訂購品項列表.Size = new System.Drawing.Size(500, 184);
            this.listBox訂購品項列表.TabIndex = 42;
            // 
            // lbl外帶
            // 
            this.lbl外帶.AutoSize = true;
            this.lbl外帶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.lbl外帶.Font = new System.Drawing.Font("微軟正黑體", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl外帶.Location = new System.Drawing.Point(56, 318);
            this.lbl外帶.Name = "lbl外帶";
            this.lbl外帶.Size = new System.Drawing.Size(54, 27);
            this.lbl外帶.TabIndex = 43;
            this.lbl外帶.Text = "外帶";
            // 
            // lbl買購物袋
            // 
            this.lbl買購物袋.AutoSize = true;
            this.lbl買購物袋.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.lbl買購物袋.Font = new System.Drawing.Font("微軟正黑體", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl買購物袋.Location = new System.Drawing.Point(125, 318);
            this.lbl買購物袋.Name = "lbl買購物袋";
            this.lbl買購物袋.Size = new System.Drawing.Size(96, 27);
            this.lbl買購物袋.TabIndex = 44;
            this.lbl買購物袋.Text = "買購物袋";
            // 
            // lbl訂單總價
            // 
            this.lbl訂單總價.AutoSize = true;
            this.lbl訂單總價.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(128)))));
            this.lbl訂單總價.Font = new System.Drawing.Font("微軟正黑體", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl訂單總價.Location = new System.Drawing.Point(319, 318);
            this.lbl訂單總價.Name = "lbl訂單總價";
            this.lbl訂單總價.Size = new System.Drawing.Size(175, 27);
            this.lbl訂單總價.TabIndex = 45;
            this.lbl訂單總價.Text = "訂單總價: 0000元";
            // 
            // btn移除所選品項
            // 
            this.btn移除所選品項.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btn移除所選品項.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn移除所選品項.ForeColor = System.Drawing.Color.Blue;
            this.btn移除所選品項.Location = new System.Drawing.Point(214, 356);
            this.btn移除所選品項.Name = "btn移除所選品項";
            this.btn移除所選品項.Size = new System.Drawing.Size(154, 38);
            this.btn移除所選品項.TabIndex = 46;
            this.btn移除所選品項.Text = "移除所選品項";
            this.btn移除所選品項.UseVisualStyleBackColor = false;
            this.btn移除所選品項.Click += new System.EventHandler(this.btn移除所選品項_Click);
            // 
            // btn刪除所有品項
            // 
            this.btn刪除所有品項.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btn刪除所有品項.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn刪除所有品項.ForeColor = System.Drawing.Color.Red;
            this.btn刪除所有品項.Location = new System.Drawing.Point(214, 400);
            this.btn刪除所有品項.Name = "btn刪除所有品項";
            this.btn刪除所有品項.Size = new System.Drawing.Size(154, 38);
            this.btn刪除所有品項.TabIndex = 47;
            this.btn刪除所有品項.Text = "刪除所有品項";
            this.btn刪除所有品項.UseVisualStyleBackColor = false;
            this.btn刪除所有品項.Click += new System.EventHandler(this.btn刪除所有品項_Click);
            // 
            // btn輸出訂購單
            // 
            this.btn輸出訂購單.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btn輸出訂購單.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn輸出訂購單.ForeColor = System.Drawing.Color.Black;
            this.btn輸出訂購單.Location = new System.Drawing.Point(374, 356);
            this.btn輸出訂購單.Name = "btn輸出訂購單";
            this.btn輸出訂購單.Size = new System.Drawing.Size(154, 38);
            this.btn輸出訂購單.TabIndex = 48;
            this.btn輸出訂購單.Text = "輸出訂購單.txt";
            this.btn輸出訂購單.UseVisualStyleBackColor = false;
            this.btn輸出訂購單.Click += new System.EventHandler(this.btn輸出訂購單_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.btnClose.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(374, 400);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(154, 38);
            this.btnClose.TabIndex = 49;
            this.btnClose.Text = "繼續購物Close";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // FormShoppingCart
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.ClientSize = new System.Drawing.Size(558, 450);
            this.Controls.Add(this.btnClose);
            this.Controls.Add(this.btn輸出訂購單);
            this.Controls.Add(this.btn刪除所有品項);
            this.Controls.Add(this.btn移除所選品項);
            this.Controls.Add(this.lbl訂單總價);
            this.Controls.Add(this.lbl買購物袋);
            this.Controls.Add(this.lbl外帶);
            this.Controls.Add(this.listBox訂購品項列表);
            this.Controls.Add(this.lbl訂購人資訊);
            this.Controls.Add(this.label1);
            this.Name = "FormShoppingCart";
            this.Text = "購物車結帳";
            this.Load += new System.EventHandler(this.FormShoppingCart_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label lbl訂購人資訊;
        private System.Windows.Forms.ListBox listBox訂購品項列表;
        private System.Windows.Forms.Label lbl外帶;
        private System.Windows.Forms.Label lbl買購物袋;
        private System.Windows.Forms.Label lbl訂單總價;
        private System.Windows.Forms.Button btn移除所選品項;
        private System.Windows.Forms.Button btn刪除所有品項;
        private System.Windows.Forms.Button btn輸出訂購單;
        private System.Windows.Forms.Button btnClose;
    }
}