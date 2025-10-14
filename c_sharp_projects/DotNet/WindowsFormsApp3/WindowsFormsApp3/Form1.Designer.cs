namespace WindowsFormsApp3
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
            this.btn清除所有品項 = new System.Windows.Forms.Button();
            this.btn今天喝什麼 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btn清除所有品項
            // 
            this.btn清除所有品項.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn清除所有品項.Location = new System.Drawing.Point(618, 384);
            this.btn清除所有品項.Name = "btn清除所有品項";
            this.btn清除所有品項.Size = new System.Drawing.Size(156, 41);
            this.btn清除所有品項.TabIndex = 0;
            this.btn清除所有品項.Text = "清除所有品項";
            this.btn清除所有品項.UseVisualStyleBackColor = true;
            this.btn清除所有品項.Click += new System.EventHandler(this.btn清除所有品項_Click);
            // 
            // btn今天喝什麼
            // 
            this.btn今天喝什麼.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn今天喝什麼.Location = new System.Drawing.Point(456, 384);
            this.btn今天喝什麼.Name = "btn今天喝什麼";
            this.btn今天喝什麼.Size = new System.Drawing.Size(156, 41);
            this.btn今天喝什麼.TabIndex = 1;
            this.btn今天喝什麼.Text = "今天喝什麼";
            this.btn今天喝什麼.UseVisualStyleBackColor = true;
            this.btn今天喝什麼.Click += new System.EventHandler(this.btn今天喝什麼_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Info;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btn今天喝什麼);
            this.Controls.Add(this.btn清除所有品項);
            this.Name = "Form1";
            this.Text = "程式化語法產生UI元件";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn清除所有品項;
        private System.Windows.Forms.Button btn今天喝什麼;
    }
}

