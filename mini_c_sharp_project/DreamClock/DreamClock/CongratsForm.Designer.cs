namespace DreamClock
{
    partial class CongratsForm
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
            this.picCongrats = new System.Windows.Forms.PictureBox();
            this.txtCongrats = new System.Windows.Forms.TextBox();
            this.btnHPage = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.picCongrats)).BeginInit();
            this.SuspendLayout();
            // 
            // picCongrats
            // 
            this.picCongrats.Location = new System.Drawing.Point(28, 27);
            this.picCongrats.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.picCongrats.Name = "picCongrats";
            this.picCongrats.Size = new System.Drawing.Size(650, 350);
            this.picCongrats.TabIndex = 0;
            this.picCongrats.TabStop = false;
            // 
            // txtCongrats
            // 
            this.txtCongrats.BackColor = System.Drawing.Color.Cornsilk;
            this.txtCongrats.Font = new System.Drawing.Font("Microsoft YaHei UI", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtCongrats.Location = new System.Drawing.Point(28, 381);
            this.txtCongrats.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txtCongrats.Multiline = true;
            this.txtCongrats.Name = "txtCongrats";
            this.txtCongrats.Size = new System.Drawing.Size(650, 80);
            this.txtCongrats.TabIndex = 1;
            this.txtCongrats.Text = "恭禧你！Congrats!";
            // 
            // btnHPage
            // 
            this.btnHPage.BackColor = System.Drawing.Color.LightCoral;
            this.btnHPage.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnHPage.Location = new System.Drawing.Point(473, 484);
            this.btnHPage.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnHPage.Name = "btnHPage";
            this.btnHPage.Size = new System.Drawing.Size(205, 58);
            this.btnHPage.TabIndex = 2;
            this.btnHPage.Text = "Back to Work 😒";
            this.btnHPage.UseVisualStyleBackColor = false;
            this.btnHPage.Click += new System.EventHandler(this.btnHPage_Click);
            // 
            // CongratsForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Linen;
            this.ClientSize = new System.Drawing.Size(704, 565);
            this.Controls.Add(this.btnHPage);
            this.Controls.Add(this.txtCongrats);
            this.Controls.Add(this.picCongrats);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "CongratsForm";
            this.Text = "Congrats";
            this.Load += new System.EventHandler(this.CongratsForm_Load);
            ((System.ComponentModel.ISupportInitialize)(this.picCongrats)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox picCongrats;
        private System.Windows.Forms.TextBox txtCongrats;
        private System.Windows.Forms.Button btnHPage;
    }
}