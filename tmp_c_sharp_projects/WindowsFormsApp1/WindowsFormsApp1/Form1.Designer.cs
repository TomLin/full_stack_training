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
            this.lbl標題 = new System.Windows.Forms.Label();
            this.lbl回應訊息 = new System.Windows.Forms.Label();
            this.btn紅茶 = new System.Windows.Forms.Button();
            this.btn綠茶 = new System.Windows.Forms.Button();
            this.btn珍珠奶茶 = new System.Windows.Forms.Button();
            this.btn烏龍茶 = new System.Windows.Forms.Button();
            this.btn礦泉水 = new System.Windows.Forms.Button();
            this.btn掃描載具 = new System.Windows.Forms.Button();
            this.btnQRCode付款 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // lbl標題
            // 
            this.lbl標題.AutoSize = true;
            this.lbl標題.Font = new System.Drawing.Font("微軟正黑體", 22.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl標題.ForeColor = System.Drawing.Color.Blue;
            this.lbl標題.Location = new System.Drawing.Point(347, 9);
            this.lbl標題.Name = "lbl標題";
            this.lbl標題.Size = new System.Drawing.Size(205, 47);
            this.lbl標題.TabIndex = 0;
            this.lbl標題.Text = "飲料販賣機";
            // 
            // lbl回應訊息
            // 
            this.lbl回應訊息.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.lbl回應訊息.Font = new System.Drawing.Font("微軟正黑體", 19.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl回應訊息.Location = new System.Drawing.Point(47, 82);
            this.lbl回應訊息.Name = "lbl回應訊息";
            this.lbl回應訊息.Size = new System.Drawing.Size(824, 263);
            this.lbl回應訊息.TabIndex = 1;
            this.lbl回應訊息.Text = "回應客戶的訊息";
            // 
            // btn紅茶
            // 
            this.btn紅茶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(192)))));
            this.btn紅茶.Font = new System.Drawing.Font("微軟正黑體", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn紅茶.Location = new System.Drawing.Point(47, 370);
            this.btn紅茶.Name = "btn紅茶";
            this.btn紅茶.Size = new System.Drawing.Size(149, 86);
            this.btn紅茶.TabIndex = 2;
            this.btn紅茶.Text = "紅茶";
            this.btn紅茶.UseVisualStyleBackColor = false;
            this.btn紅茶.Click += new System.EventHandler(this.btn紅茶_Click);
            // 
            // btn綠茶
            // 
            this.btn綠茶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.btn綠茶.Font = new System.Drawing.Font("微軟正黑體", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn綠茶.Location = new System.Drawing.Point(215, 370);
            this.btn綠茶.Name = "btn綠茶";
            this.btn綠茶.Size = new System.Drawing.Size(149, 86);
            this.btn綠茶.TabIndex = 3;
            this.btn綠茶.Text = "綠茶";
            this.btn綠茶.UseVisualStyleBackColor = false;
            this.btn綠茶.Click += new System.EventHandler(this.btn綠茶_Click);
            // 
            // btn珍珠奶茶
            // 
            this.btn珍珠奶茶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(224)))), ((int)(((byte)(192)))));
            this.btn珍珠奶茶.Font = new System.Drawing.Font("微軟正黑體", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn珍珠奶茶.Location = new System.Drawing.Point(382, 370);
            this.btn珍珠奶茶.Name = "btn珍珠奶茶";
            this.btn珍珠奶茶.Size = new System.Drawing.Size(149, 86);
            this.btn珍珠奶茶.TabIndex = 4;
            this.btn珍珠奶茶.Text = "珍珠奶茶";
            this.btn珍珠奶茶.UseVisualStyleBackColor = false;
            this.btn珍珠奶茶.Click += new System.EventHandler(this.btn珍珠奶茶_Click);
            // 
            // btn烏龍茶
            // 
            this.btn烏龍茶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
            this.btn烏龍茶.Font = new System.Drawing.Font("微軟正黑體", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn烏龍茶.Location = new System.Drawing.Point(553, 370);
            this.btn烏龍茶.Name = "btn烏龍茶";
            this.btn烏龍茶.Size = new System.Drawing.Size(149, 86);
            this.btn烏龍茶.TabIndex = 5;
            this.btn烏龍茶.Text = "烏龍茶";
            this.btn烏龍茶.UseVisualStyleBackColor = false;
            this.btn烏龍茶.Click += new System.EventHandler(this.btn烏龍茶_Click);
            // 
            // btn礦泉水
            // 
            this.btn礦泉水.BackColor = System.Drawing.Color.White;
            this.btn礦泉水.Font = new System.Drawing.Font("微軟正黑體", 16.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn礦泉水.Location = new System.Drawing.Point(722, 370);
            this.btn礦泉水.Name = "btn礦泉水";
            this.btn礦泉水.Size = new System.Drawing.Size(149, 86);
            this.btn礦泉水.TabIndex = 6;
            this.btn礦泉水.Text = "礦泉水";
            this.btn礦泉水.UseVisualStyleBackColor = false;
            this.btn礦泉水.Click += new System.EventHandler(this.btn礦泉水_Click);
            // 
            // btn掃描載具
            // 
            this.btn掃描載具.Font = new System.Drawing.Font("微軟正黑體", 19.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btn掃描載具.Location = new System.Drawing.Point(364, 533);
            this.btn掃描載具.Name = "btn掃描載具";
            this.btn掃描載具.Size = new System.Drawing.Size(202, 72);
            this.btn掃描載具.TabIndex = 7;
            this.btn掃描載具.Text = "掃描載具";
            this.btn掃描載具.UseVisualStyleBackColor = true;
            this.btn掃描載具.Click += new System.EventHandler(this.btn掃描載具_Click);
            // 
            // btnQRCode付款
            // 
            this.btnQRCode付款.Font = new System.Drawing.Font("微軟正黑體", 19.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnQRCode付款.Location = new System.Drawing.Point(585, 533);
            this.btnQRCode付款.Name = "btnQRCode付款";
            this.btnQRCode付款.Size = new System.Drawing.Size(278, 72);
            this.btnQRCode付款.TabIndex = 8;
            this.btnQRCode付款.Text = "QRCode付款";
            this.btnQRCode付款.UseVisualStyleBackColor = true;
            this.btnQRCode付款.Click += new System.EventHandler(this.btnQRCode付款_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.ClientSize = new System.Drawing.Size(919, 657);
            this.Controls.Add(this.btnQRCode付款);
            this.Controls.Add(this.btn掃描載具);
            this.Controls.Add(this.btn礦泉水);
            this.Controls.Add(this.btn烏龍茶);
            this.Controls.Add(this.btn珍珠奶茶);
            this.Controls.Add(this.btn綠茶);
            this.Controls.Add(this.btn紅茶);
            this.Controls.Add(this.lbl回應訊息);
            this.Controls.Add(this.lbl標題);
            this.Name = "Form1";
            this.Text = "飲料販賣機";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lbl標題;
        private System.Windows.Forms.Label lbl回應訊息;
        private System.Windows.Forms.Button btn紅茶;
        private System.Windows.Forms.Button btn綠茶;
        private System.Windows.Forms.Button btn珍珠奶茶;
        private System.Windows.Forms.Button btn烏龍茶;
        private System.Windows.Forms.Button btn礦泉水;
        private System.Windows.Forms.Button btn掃描載具;
        private System.Windows.Forms.Button btnQRCode付款;
    }
}

