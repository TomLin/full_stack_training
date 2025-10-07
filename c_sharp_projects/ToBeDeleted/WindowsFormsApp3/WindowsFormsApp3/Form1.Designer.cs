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
            this.btn方法1 = new System.Windows.Forms.Button();
            this.方法2 = new System.Windows.Forms.Button();
            this.方法3 = new System.Windows.Forms.Button();
            this.方法4 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btn方法1
            // 
            this.btn方法1.Location = new System.Drawing.Point(108, 34);
            this.btn方法1.Name = "btn方法1";
            this.btn方法1.Size = new System.Drawing.Size(129, 66);
            this.btn方法1.TabIndex = 0;
            this.btn方法1.Text = "方法1";
            this.btn方法1.UseVisualStyleBackColor = true;
            this.btn方法1.Click += new System.EventHandler(this.btn方法1_Click);
            // 
            // 方法2
            // 
            this.方法2.Location = new System.Drawing.Point(108, 132);
            this.方法2.Name = "方法2";
            this.方法2.Size = new System.Drawing.Size(129, 66);
            this.方法2.TabIndex = 1;
            this.方法2.Text = "方法2";
            this.方法2.UseVisualStyleBackColor = true;
            // 
            // 方法3
            // 
            this.方法3.Location = new System.Drawing.Point(108, 229);
            this.方法3.Name = "方法3";
            this.方法3.Size = new System.Drawing.Size(129, 66);
            this.方法3.TabIndex = 2;
            this.方法3.Text = "方法3";
            this.方法3.UseVisualStyleBackColor = true;
            // 
            // 方法4
            // 
            this.方法4.Location = new System.Drawing.Point(108, 331);
            this.方法4.Name = "方法4";
            this.方法4.Size = new System.Drawing.Size(129, 66);
            this.方法4.TabIndex = 3;
            this.方法4.Text = "方法4";
            this.方法4.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.方法4);
            this.Controls.Add(this.方法3);
            this.Controls.Add(this.方法2);
            this.Controls.Add(this.btn方法1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn方法1;
        private System.Windows.Forms.Button 方法2;
        private System.Windows.Forms.Button 方法3;
        private System.Windows.Forms.Button 方法4;
    }
}

