namespace WindowsFormsApp1
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
            this.btn建立員工1物件 = new System.Windows.Forms.Button();
            this.btn建立員工2物件 = new System.Windows.Forms.Button();
            this.btn列出所有員工 = new System.Windows.Forms.Button();
            this.btn建立管理者物件 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btn建立員工1物件
            // 
            this.btn建立員工1物件.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn建立員工1物件.Location = new System.Drawing.Point(36, 82);
            this.btn建立員工1物件.Name = "btn建立員工1物件";
            this.btn建立員工1物件.Size = new System.Drawing.Size(264, 60);
            this.btn建立員工1物件.TabIndex = 0;
            this.btn建立員工1物件.Text = "建立員工1物件";
            this.btn建立員工1物件.UseVisualStyleBackColor = true;
            this.btn建立員工1物件.Click += new System.EventHandler(this.btn建立員工1物件_Click);
            // 
            // btn建立員工2物件
            // 
            this.btn建立員工2物件.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn建立員工2物件.Location = new System.Drawing.Point(36, 170);
            this.btn建立員工2物件.Name = "btn建立員工2物件";
            this.btn建立員工2物件.Size = new System.Drawing.Size(264, 60);
            this.btn建立員工2物件.TabIndex = 1;
            this.btn建立員工2物件.Text = "建立員工2物件";
            this.btn建立員工2物件.UseVisualStyleBackColor = true;
            this.btn建立員工2物件.Click += new System.EventHandler(this.btn建立員工2物件_Click);
            // 
            // btn列出所有員工
            // 
            this.btn列出所有員工.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn列出所有員工.Location = new System.Drawing.Point(36, 262);
            this.btn列出所有員工.Name = "btn列出所有員工";
            this.btn列出所有員工.Size = new System.Drawing.Size(264, 60);
            this.btn列出所有員工.TabIndex = 2;
            this.btn列出所有員工.Text = "列出所有員工";
            this.btn列出所有員工.UseVisualStyleBackColor = true;
            this.btn列出所有員工.Click += new System.EventHandler(this.btn列出所有員工_Click);
            // 
            // btn建立管理者物件
            // 
            this.btn建立管理者物件.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn建立管理者物件.Location = new System.Drawing.Point(36, 357);
            this.btn建立管理者物件.Name = "btn建立管理者物件";
            this.btn建立管理者物件.Size = new System.Drawing.Size(264, 60);
            this.btn建立管理者物件.TabIndex = 3;
            this.btn建立管理者物件.Text = "建立管理者物件";
            this.btn建立管理者物件.UseVisualStyleBackColor = true;
            this.btn建立管理者物件.Click += new System.EventHandler(this.btn建立管理者物件_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.ClientSize = new System.Drawing.Size(339, 541);
            this.Controls.Add(this.btn建立管理者物件);
            this.Controls.Add(this.btn列出所有員工);
            this.Controls.Add(this.btn建立員工2物件);
            this.Controls.Add(this.btn建立員工1物件);
            this.Name = "Form1";
            this.Text = "Class類別的探討";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn建立員工1物件;
        private System.Windows.Forms.Button btn建立員工2物件;
        private System.Windows.Forms.Button btn列出所有員工;
        private System.Windows.Forms.Button btn建立管理者物件;
    }
}

