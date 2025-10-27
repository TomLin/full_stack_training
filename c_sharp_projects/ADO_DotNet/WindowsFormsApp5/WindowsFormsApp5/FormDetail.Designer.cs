namespace WindowsFormsApp5
{
    partial class FormDetail
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
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.textBoxId = new System.Windows.Forms.TextBox();
            this.textBoxProduct = new System.Windows.Forms.TextBox();
            this.textBoxPrice = new System.Windows.Forms.TextBox();
            this.textBoxAmt = new System.Windows.Forms.TextBox();
            this.textBoxDesc = new System.Windows.Forms.TextBox();
            this.groupBoxNew = new System.Windows.Forms.GroupBox();
            this.btnClearNew = new System.Windows.Forms.Button();
            this.btnSaveNew = new System.Windows.Forms.Button();
            this.btnPicNew = new System.Windows.Forms.Button();
            this.label8 = new System.Windows.Forms.Label();
            this.pictureBoxProduct = new System.Windows.Forms.PictureBox();
            this.groupBoxUpdate = new System.Windows.Forms.GroupBox();
            this.btnSaveUpdate = new System.Windows.Forms.Button();
            this.btnPicUpdate = new System.Windows.Forms.Button();
            this.groupBoxDelete = new System.Windows.Forms.GroupBox();
            this.btnDelete = new System.Windows.Forms.Button();
            this.comboBoxGroup = new System.Windows.Forms.ComboBox();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBoxNew.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxProduct)).BeginInit();
            this.groupBoxUpdate.SuspendLayout();
            this.groupBoxDelete.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label1.ForeColor = System.Drawing.Color.SaddleBrown;
            this.label1.Location = new System.Drawing.Point(305, 18);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(158, 31);
            this.label1.TabIndex = 0;
            this.label1.Text = "商品詳細資訊";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label2.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label2.Location = new System.Drawing.Point(24, 74);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(28, 24);
            this.label2.TabIndex = 1;
            this.label2.Text = "Id";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label3.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label3.Location = new System.Drawing.Point(24, 120);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(86, 24);
            this.label3.TabIndex = 2;
            this.label3.Text = "商品名稱";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label4.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label4.Location = new System.Drawing.Point(24, 157);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(86, 24);
            this.label4.TabIndex = 3;
            this.label4.Text = "商品價格";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label5.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label5.Location = new System.Drawing.Point(24, 198);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(152, 24);
            this.label5.TabIndex = 4;
            this.label5.Text = "商品描述(500字)";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label6.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label6.Location = new System.Drawing.Point(142, 74);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(86, 24);
            this.label6.TabIndex = 5;
            this.label6.Text = "商品分類";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label7.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label7.Location = new System.Drawing.Point(200, 157);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(86, 24);
            this.label7.TabIndex = 6;
            this.label7.Text = "商品數量";
            // 
            // textBoxId
            // 
            this.textBoxId.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.textBoxId.Location = new System.Drawing.Point(58, 72);
            this.textBoxId.Name = "textBoxId";
            this.textBoxId.ReadOnly = true;
            this.textBoxId.Size = new System.Drawing.Size(78, 29);
            this.textBoxId.TabIndex = 7;
            // 
            // textBoxProduct
            // 
            this.textBoxProduct.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.textBoxProduct.Location = new System.Drawing.Point(116, 115);
            this.textBoxProduct.Name = "textBoxProduct";
            this.textBoxProduct.Size = new System.Drawing.Size(248, 29);
            this.textBoxProduct.TabIndex = 9;
            // 
            // textBoxPrice
            // 
            this.textBoxPrice.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.textBoxPrice.Location = new System.Drawing.Point(116, 157);
            this.textBoxPrice.Name = "textBoxPrice";
            this.textBoxPrice.Size = new System.Drawing.Size(78, 29);
            this.textBoxPrice.TabIndex = 10;
            // 
            // textBoxAmt
            // 
            this.textBoxAmt.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.textBoxAmt.Location = new System.Drawing.Point(292, 157);
            this.textBoxAmt.Name = "textBoxAmt";
            this.textBoxAmt.Size = new System.Drawing.Size(72, 29);
            this.textBoxAmt.TabIndex = 11;
            // 
            // textBoxDesc
            // 
            this.textBoxDesc.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.textBoxDesc.Location = new System.Drawing.Point(28, 234);
            this.textBoxDesc.Multiline = true;
            this.textBoxDesc.Name = "textBoxDesc";
            this.textBoxDesc.Size = new System.Drawing.Size(336, 114);
            this.textBoxDesc.TabIndex = 12;
            // 
            // groupBoxNew
            // 
            this.groupBoxNew.BackColor = System.Drawing.Color.Pink;
            this.groupBoxNew.Controls.Add(this.btnClearNew);
            this.groupBoxNew.Controls.Add(this.btnSaveNew);
            this.groupBoxNew.Controls.Add(this.btnPicNew);
            this.groupBoxNew.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.groupBoxNew.Location = new System.Drawing.Point(28, 368);
            this.groupBoxNew.Name = "groupBoxNew";
            this.groupBoxNew.Size = new System.Drawing.Size(229, 153);
            this.groupBoxNew.TabIndex = 13;
            this.groupBoxNew.TabStop = false;
            this.groupBoxNew.Text = "新增";
            // 
            // btnClearNew
            // 
            this.btnClearNew.Location = new System.Drawing.Point(57, 107);
            this.btnClearNew.Name = "btnClearNew";
            this.btnClearNew.Size = new System.Drawing.Size(109, 36);
            this.btnClearNew.TabIndex = 2;
            this.btnClearNew.Text = "清空欄位";
            this.btnClearNew.UseVisualStyleBackColor = true;
            this.btnClearNew.Click += new System.EventHandler(this.btnClearNew_Click);
            // 
            // btnSaveNew
            // 
            this.btnSaveNew.Location = new System.Drawing.Point(57, 65);
            this.btnSaveNew.Name = "btnSaveNew";
            this.btnSaveNew.Size = new System.Drawing.Size(109, 36);
            this.btnSaveNew.TabIndex = 1;
            this.btnSaveNew.Text = "新增儲存";
            this.btnSaveNew.UseVisualStyleBackColor = true;
            this.btnSaveNew.Click += new System.EventHandler(this.btnSaveNew_Click);
            // 
            // btnPicNew
            // 
            this.btnPicNew.Location = new System.Drawing.Point(57, 23);
            this.btnPicNew.Name = "btnPicNew";
            this.btnPicNew.Size = new System.Drawing.Size(109, 36);
            this.btnPicNew.TabIndex = 0;
            this.btnPicNew.Text = "選取圖片";
            this.btnPicNew.UseVisualStyleBackColor = true;
            this.btnPicNew.Click += new System.EventHandler(this.btnPicNew_Click);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label8.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label8.Location = new System.Drawing.Point(404, 72);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(86, 24);
            this.label8.TabIndex = 14;
            this.label8.Text = "商品圖片";
            // 
            // pictureBoxProduct
            // 
            this.pictureBoxProduct.Location = new System.Drawing.Point(408, 115);
            this.pictureBoxProduct.Name = "pictureBoxProduct";
            this.pictureBoxProduct.Size = new System.Drawing.Size(312, 233);
            this.pictureBoxProduct.TabIndex = 15;
            this.pictureBoxProduct.TabStop = false;
            // 
            // groupBoxUpdate
            // 
            this.groupBoxUpdate.BackColor = System.Drawing.Color.Pink;
            this.groupBoxUpdate.Controls.Add(this.btnSaveUpdate);
            this.groupBoxUpdate.Controls.Add(this.btnPicUpdate);
            this.groupBoxUpdate.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.groupBoxUpdate.Location = new System.Drawing.Point(283, 368);
            this.groupBoxUpdate.Name = "groupBoxUpdate";
            this.groupBoxUpdate.Size = new System.Drawing.Size(229, 153);
            this.groupBoxUpdate.TabIndex = 14;
            this.groupBoxUpdate.TabStop = false;
            this.groupBoxUpdate.Text = "修改";
            // 
            // btnSaveUpdate
            // 
            this.btnSaveUpdate.Location = new System.Drawing.Point(59, 65);
            this.btnSaveUpdate.Name = "btnSaveUpdate";
            this.btnSaveUpdate.Size = new System.Drawing.Size(109, 36);
            this.btnSaveUpdate.TabIndex = 2;
            this.btnSaveUpdate.Text = "修改儲存";
            this.btnSaveUpdate.UseVisualStyleBackColor = true;
            this.btnSaveUpdate.Click += new System.EventHandler(this.btnSaveUpdate_Click);
            // 
            // btnPicUpdate
            // 
            this.btnPicUpdate.Location = new System.Drawing.Point(59, 23);
            this.btnPicUpdate.Name = "btnPicUpdate";
            this.btnPicUpdate.Size = new System.Drawing.Size(109, 36);
            this.btnPicUpdate.TabIndex = 1;
            this.btnPicUpdate.Text = "選取圖片";
            this.btnPicUpdate.UseVisualStyleBackColor = true;
            this.btnPicUpdate.Click += new System.EventHandler(this.btnPicUpdate_Click);
            // 
            // groupBoxDelete
            // 
            this.groupBoxDelete.BackColor = System.Drawing.Color.Pink;
            this.groupBoxDelete.Controls.Add(this.btnDelete);
            this.groupBoxDelete.Font = new System.Drawing.Font("微軟正黑體", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.groupBoxDelete.Location = new System.Drawing.Point(538, 368);
            this.groupBoxDelete.Name = "groupBoxDelete";
            this.groupBoxDelete.Size = new System.Drawing.Size(230, 153);
            this.groupBoxDelete.TabIndex = 16;
            this.groupBoxDelete.TabStop = false;
            this.groupBoxDelete.Text = "刪除";
            // 
            // btnDelete
            // 
            this.btnDelete.Location = new System.Drawing.Point(63, 23);
            this.btnDelete.Name = "btnDelete";
            this.btnDelete.Size = new System.Drawing.Size(109, 36);
            this.btnDelete.TabIndex = 1;
            this.btnDelete.Text = "刪除商品";
            this.btnDelete.UseVisualStyleBackColor = true;
            this.btnDelete.Click += new System.EventHandler(this.btnDelete_Click);
            // 
            // comboBoxGroup
            // 
            this.comboBoxGroup.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.comboBoxGroup.FormattingEnabled = true;
            this.comboBoxGroup.Location = new System.Drawing.Point(234, 71);
            this.comboBoxGroup.Name = "comboBoxGroup";
            this.comboBoxGroup.Size = new System.Drawing.Size(121, 29);
            this.comboBoxGroup.TabIndex = 17;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("微軟正黑體", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label9.ForeColor = System.Drawing.SystemColors.ActiveCaptionText;
            this.label9.Location = new System.Drawing.Point(26, 104);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(88, 15);
            this.label9.TabIndex = 18;
            this.label9.Text = "(Id 為 readonly)";
            // 
            // FormDetail
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Lavender;
            this.ClientSize = new System.Drawing.Size(800, 564);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.comboBoxGroup);
            this.Controls.Add(this.groupBoxDelete);
            this.Controls.Add(this.groupBoxUpdate);
            this.Controls.Add(this.pictureBoxProduct);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.groupBoxNew);
            this.Controls.Add(this.textBoxDesc);
            this.Controls.Add(this.textBoxAmt);
            this.Controls.Add(this.textBoxPrice);
            this.Controls.Add(this.textBoxProduct);
            this.Controls.Add(this.textBoxId);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Name = "FormDetail";
            this.Text = "商品詳細資訊";
            this.Load += new System.EventHandler(this.FormDetail_Load);
            this.groupBoxNew.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxProduct)).EndInit();
            this.groupBoxUpdate.ResumeLayout(false);
            this.groupBoxDelete.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.TextBox textBoxId;
        private System.Windows.Forms.TextBox textBoxProduct;
        private System.Windows.Forms.TextBox textBoxPrice;
        private System.Windows.Forms.TextBox textBoxAmt;
        private System.Windows.Forms.TextBox textBoxDesc;
        private System.Windows.Forms.GroupBox groupBoxNew;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.PictureBox pictureBoxProduct;
        private System.Windows.Forms.GroupBox groupBoxUpdate;
        private System.Windows.Forms.GroupBox groupBoxDelete;
        private System.Windows.Forms.ComboBox comboBoxGroup;
        private System.Windows.Forms.Button btnClearNew;
        private System.Windows.Forms.Button btnSaveNew;
        private System.Windows.Forms.Button btnPicNew;
        private System.Windows.Forms.Button btnSaveUpdate;
        private System.Windows.Forms.Button btnPicUpdate;
        private System.Windows.Forms.Button btnDelete;
        private System.Windows.Forms.Label label9;
    }
}