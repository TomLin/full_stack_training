namespace WindowsFormsApp6
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
            this.btnOrder = new System.Windows.Forms.Button();
            this.btnPDisplay = new System.Windows.Forms.Button();
            this.btnMember = new System.Windows.Forms.Button();
            this.lblUser = new System.Windows.Forms.Label();
            this.btnLogOut = new System.Windows.Forms.Button();
            this.btnOrderMgt = new System.Windows.Forms.Button();
            this.btnSysConfig = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label1.Location = new System.Drawing.Point(328, 19);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(134, 31);
            this.label1.TabIndex = 0;
            this.label1.Text = "功能主選單";
            // 
            // btnOrder
            // 
            this.btnOrder.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnOrder.Location = new System.Drawing.Point(48, 108);
            this.btnOrder.Name = "btnOrder";
            this.btnOrder.Size = new System.Drawing.Size(105, 60);
            this.btnOrder.TabIndex = 1;
            this.btnOrder.Text = "訂購單";
            this.btnOrder.UseVisualStyleBackColor = true;
            // 
            // btnPDisplay
            // 
            this.btnPDisplay.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnPDisplay.Location = new System.Drawing.Point(188, 108);
            this.btnPDisplay.Name = "btnPDisplay";
            this.btnPDisplay.Size = new System.Drawing.Size(112, 60);
            this.btnPDisplay.TabIndex = 2;
            this.btnPDisplay.Text = "商品展示";
            this.btnPDisplay.UseVisualStyleBackColor = true;
            // 
            // btnMember
            // 
            this.btnMember.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnMember.Location = new System.Drawing.Point(332, 108);
            this.btnMember.Name = "btnMember";
            this.btnMember.Size = new System.Drawing.Size(110, 60);
            this.btnMember.TabIndex = 3;
            this.btnMember.Text = "會員資料";
            this.btnMember.UseVisualStyleBackColor = true;
            // 
            // lblUser
            // 
            this.lblUser.AutoSize = true;
            this.lblUser.Font = new System.Drawing.Font("微軟正黑體", 14.25F, ((System.Drawing.FontStyle)((System.Drawing.FontStyle.Bold | System.Drawing.FontStyle.Italic))), System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lblUser.Location = new System.Drawing.Point(25, 24);
            this.lblUser.Name = "lblUser";
            this.lblUser.Size = new System.Drawing.Size(67, 24);
            this.lblUser.TabIndex = 4;
            this.lblUser.Text = "使用者";
            // 
            // btnLogOut
            // 
            this.btnLogOut.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnLogOut.Location = new System.Drawing.Point(613, 19);
            this.btnLogOut.Name = "btnLogOut";
            this.btnLogOut.Size = new System.Drawing.Size(87, 43);
            this.btnLogOut.TabIndex = 5;
            this.btnLogOut.Text = "登出";
            this.btnLogOut.UseVisualStyleBackColor = true;
            this.btnLogOut.Click += new System.EventHandler(this.btnLogOut_Click);
            // 
            // btnOrderMgt
            // 
            this.btnOrderMgt.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnOrderMgt.Location = new System.Drawing.Point(470, 108);
            this.btnOrderMgt.Name = "btnOrderMgt";
            this.btnOrderMgt.Size = new System.Drawing.Size(110, 60);
            this.btnOrderMgt.TabIndex = 6;
            this.btnOrderMgt.Text = "訂單管理";
            this.btnOrderMgt.UseVisualStyleBackColor = true;
            // 
            // btnSysConfig
            // 
            this.btnSysConfig.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnSysConfig.Location = new System.Drawing.Point(613, 108);
            this.btnSysConfig.Name = "btnSysConfig";
            this.btnSysConfig.Size = new System.Drawing.Size(110, 60);
            this.btnSysConfig.TabIndex = 7;
            this.btnSysConfig.Text = "系統設定";
            this.btnSysConfig.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label2.Location = new System.Drawing.Point(706, 24);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(80, 31);
            this.label2.TabIndex = 8;
            this.label2.Text = "⛱⛱";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.MistyRose;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.btnSysConfig);
            this.Controls.Add(this.btnOrderMgt);
            this.Controls.Add(this.btnLogOut);
            this.Controls.Add(this.lblUser);
            this.Controls.Add(this.btnMember);
            this.Controls.Add(this.btnPDisplay);
            this.Controls.Add(this.btnOrder);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Activated += new System.EventHandler(this.Form1_Activated);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnOrder;
        private System.Windows.Forms.Button btnPDisplay;
        private System.Windows.Forms.Button btnMember;
        private System.Windows.Forms.Label lblUser;
        private System.Windows.Forms.Button btnLogOut;
        private System.Windows.Forms.Button btnOrderMgt;
        private System.Windows.Forms.Button btnSysConfig;
        private System.Windows.Forms.Label label2;
    }
}

