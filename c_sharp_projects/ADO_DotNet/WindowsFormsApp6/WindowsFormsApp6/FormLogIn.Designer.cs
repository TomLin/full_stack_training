namespace WindowsFormsApp6
{
    partial class FormLogIn
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
            this.txtMulti = new System.Windows.Forms.TextBox();
            this.txtId = new System.Windows.Forms.TextBox();
            this.txtTel = new System.Windows.Forms.TextBox();
            this.btnLogIn = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(94, 24);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(110, 31);
            this.label1.TabIndex = 0;
            this.label1.Text = "登入會員";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(30, 82);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(94, 31);
            this.label2.TabIndex = 1;
            this.label2.Text = "會員 ID";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(30, 169);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(62, 31);
            this.label3.TabIndex = 2;
            this.label3.Text = "電話";
            // 
            // txtMulti
            // 
            this.txtMulti.Location = new System.Drawing.Point(36, 254);
            this.txtMulti.Multiline = true;
            this.txtMulti.Name = "txtMulti";
            this.txtMulti.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txtMulti.Size = new System.Drawing.Size(303, 202);
            this.txtMulti.TabIndex = 3;
            // 
            // txtId
            // 
            this.txtId.Location = new System.Drawing.Point(36, 116);
            this.txtId.Name = "txtId";
            this.txtId.Size = new System.Drawing.Size(303, 39);
            this.txtId.TabIndex = 4;
            // 
            // txtTel
            // 
            this.txtTel.Location = new System.Drawing.Point(36, 203);
            this.txtTel.Name = "txtTel";
            this.txtTel.Size = new System.Drawing.Size(303, 39);
            this.txtTel.TabIndex = 5;
            // 
            // btnLogIn
            // 
            this.btnLogIn.Location = new System.Drawing.Point(36, 466);
            this.btnLogIn.Name = "btnLogIn";
            this.btnLogIn.Size = new System.Drawing.Size(118, 69);
            this.btnLogIn.TabIndex = 6;
            this.btnLogIn.Text = "登入";
            this.btnLogIn.UseVisualStyleBackColor = true;
            this.btnLogIn.Click += new System.EventHandler(this.btnLogIn_Click);
            // 
            // FormLogIn
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(15F, 31F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.LavenderBlush;
            this.ClientSize = new System.Drawing.Size(407, 548);
            this.Controls.Add(this.btnLogIn);
            this.Controls.Add(this.txtTel);
            this.Controls.Add(this.txtId);
            this.Controls.Add(this.txtMulti);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Font = new System.Drawing.Font("微軟正黑體", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.Margin = new System.Windows.Forms.Padding(8, 8, 8, 8);
            this.Name = "FormLogIn";
            this.Text = "FormLogIn";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.FormLogIn_FormClosing);
            this.Load += new System.EventHandler(this.FormLogIn_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtMulti;
        private System.Windows.Forms.TextBox txtId;
        private System.Windows.Forms.TextBox txtTel;
        private System.Windows.Forms.Button btnLogIn;
    }
}