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
            this.btn員工One = new System.Windows.Forms.Button();
            this.btn員工Two = new System.Windows.Forms.Button();
            this.btn所有員工 = new System.Windows.Forms.Button();
            this.btn管理者 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // btn員工One
            // 
            this.btn員工One.BackColor = System.Drawing.Color.LightGray;
            this.btn員工One.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn員工One.Location = new System.Drawing.Point(33, 29);
            this.btn員工One.Name = "btn員工One";
            this.btn員工One.Size = new System.Drawing.Size(237, 51);
            this.btn員工One.TabIndex = 0;
            this.btn員工One.Text = "建立員工1物件";
            this.btn員工One.UseVisualStyleBackColor = false;
            this.btn員工One.Click += new System.EventHandler(this.btn員工One_Click);
            // 
            // btn員工Two
            // 
            this.btn員工Two.BackColor = System.Drawing.Color.LightGray;
            this.btn員工Two.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn員工Two.Location = new System.Drawing.Point(33, 114);
            this.btn員工Two.Name = "btn員工Two";
            this.btn員工Two.Size = new System.Drawing.Size(237, 51);
            this.btn員工Two.TabIndex = 1;
            this.btn員工Two.Text = "建立員工2物件";
            this.btn員工Two.UseVisualStyleBackColor = false;
            this.btn員工Two.Click += new System.EventHandler(this.btn員工Two_Click);
            // 
            // btn所有員工
            // 
            this.btn所有員工.BackColor = System.Drawing.Color.LightGray;
            this.btn所有員工.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn所有員工.Location = new System.Drawing.Point(33, 205);
            this.btn所有員工.Name = "btn所有員工";
            this.btn所有員工.Size = new System.Drawing.Size(237, 51);
            this.btn所有員工.TabIndex = 2;
            this.btn所有員工.Text = "列出所有員工";
            this.btn所有員工.UseVisualStyleBackColor = false;
            this.btn所有員工.Click += new System.EventHandler(this.btn所有員工_Click);
            // 
            // btn管理者
            // 
            this.btn管理者.BackColor = System.Drawing.Color.LightGray;
            this.btn管理者.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn管理者.Location = new System.Drawing.Point(33, 296);
            this.btn管理者.Name = "btn管理者";
            this.btn管理者.Size = new System.Drawing.Size(237, 51);
            this.btn管理者.TabIndex = 3;
            this.btn管理者.Text = "建立管理者物件";
            this.btn管理者.UseVisualStyleBackColor = false;
            this.btn管理者.Click += new System.EventHandler(this.btn管理者_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(612, 450);
            this.Controls.Add(this.btn管理者);
            this.Controls.Add(this.btn所有員工);
            this.Controls.Add(this.btn員工Two);
            this.Controls.Add(this.btn員工One);
            this.Name = "Form1";
            this.Text = "Class的探討";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn員工One;
        private System.Windows.Forms.Button btn員工Two;
        private System.Windows.Forms.Button btn所有員工;
        private System.Windows.Forms.Button btn管理者;
    }
}

