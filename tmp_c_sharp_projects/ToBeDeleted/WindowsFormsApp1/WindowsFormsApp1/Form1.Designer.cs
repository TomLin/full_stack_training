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
            this.lbl標頭 = new System.Windows.Forms.Label();
            this.lbl回應訊息 = new System.Windows.Forms.Label();
            this.btn紅茶 = new System.Windows.Forms.Button();
            this.btn綠茶 = new System.Windows.Forms.Button();
            this.btn珍珠奶茶 = new System.Windows.Forms.Button();
            this.btn烏龍茶 = new System.Windows.Forms.Button();
            this.btn礦泉水 = new System.Windows.Forms.Button();
            this.btn載具 = new System.Windows.Forms.Button();
            this.btn付款 = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // lbl標頭
            // 
            this.lbl標頭.AutoSize = true;
            this.lbl標頭.Font = new System.Drawing.Font("新細明體", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl標頭.Location = new System.Drawing.Point(29, 26);
            this.lbl標頭.Name = "lbl標頭";
            this.lbl標頭.Size = new System.Drawing.Size(135, 24);
            this.lbl標頭.TabIndex = 0;
            this.lbl標頭.Text = "飲料販賣機";
            // 
            // lbl回應訊息
            // 
            this.lbl回應訊息.BackColor = System.Drawing.SystemColors.Info;
            this.lbl回應訊息.Font = new System.Drawing.Font("新細明體", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.lbl回應訊息.Location = new System.Drawing.Point(29, 73);
            this.lbl回應訊息.Name = "lbl回應訊息";
            this.lbl回應訊息.Size = new System.Drawing.Size(518, 113);
            this.lbl回應訊息.TabIndex = 1;
            this.lbl回應訊息.Text = "回應客戶訊息";
            // 
            // btn紅茶
            // 
            this.btn紅茶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(192)))));
            this.btn紅茶.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn紅茶.Location = new System.Drawing.Point(33, 224);
            this.btn紅茶.Name = "btn紅茶";
            this.btn紅茶.Size = new System.Drawing.Size(88, 46);
            this.btn紅茶.TabIndex = 2;
            this.btn紅茶.Text = "紅茶";
            this.btn紅茶.UseVisualStyleBackColor = false;
            this.btn紅茶.Click += new System.EventHandler(this.btn紅茶_Click);
            // 
            // btn綠茶
            // 
            this.btn綠茶.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
            this.btn綠茶.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn綠茶.Location = new System.Drawing.Point(127, 224);
            this.btn綠茶.Name = "btn綠茶";
            this.btn綠茶.Size = new System.Drawing.Size(88, 46);
            this.btn綠茶.TabIndex = 3;
            this.btn綠茶.Text = "綠茶";
            this.btn綠茶.UseVisualStyleBackColor = false;
            this.btn綠茶.Click += new System.EventHandler(this.btn綠茶_Click);
            // 
            // btn珍珠奶茶
            // 
            this.btn珍珠奶茶.BackColor = System.Drawing.Color.Cyan;
            this.btn珍珠奶茶.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn珍珠奶茶.Location = new System.Drawing.Point(233, 224);
            this.btn珍珠奶茶.Name = "btn珍珠奶茶";
            this.btn珍珠奶茶.Size = new System.Drawing.Size(107, 46);
            this.btn珍珠奶茶.TabIndex = 4;
            this.btn珍珠奶茶.Text = "珍珠奶茶";
            this.btn珍珠奶茶.UseVisualStyleBackColor = false;
            this.btn珍珠奶茶.Click += new System.EventHandler(this.btn珍珠奶茶_Click);
            // 
            // btn烏龍茶
            // 
            this.btn烏龍茶.BackColor = System.Drawing.Color.Fuchsia;
            this.btn烏龍茶.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn烏龍茶.Location = new System.Drawing.Point(346, 224);
            this.btn烏龍茶.Name = "btn烏龍茶";
            this.btn烏龍茶.Size = new System.Drawing.Size(88, 46);
            this.btn烏龍茶.TabIndex = 5;
            this.btn烏龍茶.Text = "烏龍茶";
            this.btn烏龍茶.UseVisualStyleBackColor = false;
            this.btn烏龍茶.Click += new System.EventHandler(this.btn烏龍茶_Click);
            // 
            // btn礦泉水
            // 
            this.btn礦泉水.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(128)))), ((int)(((byte)(255)))));
            this.btn礦泉水.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn礦泉水.Location = new System.Drawing.Point(459, 224);
            this.btn礦泉水.Name = "btn礦泉水";
            this.btn礦泉水.Size = new System.Drawing.Size(88, 46);
            this.btn礦泉水.TabIndex = 6;
            this.btn礦泉水.Text = "礦泉水";
            this.btn礦泉水.UseVisualStyleBackColor = false;
            this.btn礦泉水.Click += new System.EventHandler(this.btn礦泉水_Click);
            // 
            // btn載具
            // 
            this.btn載具.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btn載具.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn載具.Location = new System.Drawing.Point(180, 392);
            this.btn載具.Name = "btn載具";
            this.btn載具.Size = new System.Drawing.Size(160, 46);
            this.btn載具.TabIndex = 7;
            this.btn載具.Text = "掃描載具";
            this.btn載具.UseVisualStyleBackColor = false;
            this.btn載具.Click += new System.EventHandler(this.btn載具_Click);
            // 
            // btn付款
            // 
            this.btn付款.BackColor = System.Drawing.Color.DarkOrange;
            this.btn付款.Font = new System.Drawing.Font("新細明體", 12F);
            this.btn付款.Location = new System.Drawing.Point(390, 392);
            this.btn付款.Name = "btn付款";
            this.btn付款.Size = new System.Drawing.Size(157, 46);
            this.btn付款.TabIndex = 8;
            this.btn付款.Text = "QR Code 付款";
            this.btn付款.UseVisualStyleBackColor = false;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.LightSkyBlue;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btn付款);
            this.Controls.Add(this.btn載具);
            this.Controls.Add(this.btn礦泉水);
            this.Controls.Add(this.btn烏龍茶);
            this.Controls.Add(this.btn珍珠奶茶);
            this.Controls.Add(this.btn綠茶);
            this.Controls.Add(this.btn紅茶);
            this.Controls.Add(this.lbl回應訊息);
            this.Controls.Add(this.lbl標頭);
            this.Name = "Form1";
            this.Text = "冷飲販賣機";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label lbl標頭;
        private System.Windows.Forms.Label lbl回應訊息;
        private System.Windows.Forms.Button btn紅茶;
        private System.Windows.Forms.Button btn綠茶;
        private System.Windows.Forms.Button btn珍珠奶茶;
        private System.Windows.Forms.Button btn烏龍茶;
        private System.Windows.Forms.Button btn礦泉水;
        private System.Windows.Forms.Button btn載具;
        private System.Windows.Forms.Button btn付款;
    }
}

