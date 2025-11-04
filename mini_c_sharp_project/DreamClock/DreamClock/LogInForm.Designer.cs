namespace DreamClock
{
    partial class LogInForm
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
            this.txtAcct = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.btnSignIn = new System.Windows.Forms.Button();
            this.btnSignUp = new System.Windows.Forms.Button();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(11, 132);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(95, 33);
            this.label1.TabIndex = 5;
            this.label1.Text = "Account";
            // 
            // txtAcct
            // 
            this.txtAcct.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtAcct.Location = new System.Drawing.Point(15, 167);
            this.txtAcct.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txtAcct.Name = "txtAcct";
            this.txtAcct.Size = new System.Drawing.Size(91, 41);
            this.txtAcct.TabIndex = 4;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.Peru;
            this.label2.Location = new System.Drawing.Point(11, 9);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(293, 33);
            this.label2.TabIndex = 6;
            this.label2.Text = "Greetings from DreamClock!";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.Location = new System.Drawing.Point(11, 220);
            this.label4.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(106, 33);
            this.label4.TabIndex = 9;
            this.label4.Text = "Password";
            // 
            // txtPassword
            // 
            this.txtPassword.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtPassword.Location = new System.Drawing.Point(17, 269);
            this.txtPassword.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.Size = new System.Drawing.Size(91, 41);
            this.txtPassword.TabIndex = 8;
            // 
            // btnSignIn
            // 
            this.btnSignIn.BackColor = System.Drawing.Color.BlanchedAlmond;
            this.btnSignIn.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnSignIn.Location = new System.Drawing.Point(248, 269);
            this.btnSignIn.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnSignIn.Name = "btnSignIn";
            this.btnSignIn.Size = new System.Drawing.Size(116, 44);
            this.btnSignIn.TabIndex = 12;
            this.btnSignIn.Text = "Sign In";
            this.btnSignIn.UseVisualStyleBackColor = false;
            this.btnSignIn.Click += new System.EventHandler(this.btnSignIn_Click);
            // 
            // btnSignUp
            // 
            this.btnSignUp.BackColor = System.Drawing.Color.BlanchedAlmond;
            this.btnSignUp.Font = new System.Drawing.Font("Segoe Print", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnSignUp.Location = new System.Drawing.Point(248, 322);
            this.btnSignUp.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.btnSignUp.Name = "btnSignUp";
            this.btnSignUp.Size = new System.Drawing.Size(116, 42);
            this.btnSignUp.TabIndex = 13;
            this.btnSignUp.Text = "Sign Up";
            this.btnSignUp.UseVisualStyleBackColor = false;
            this.btnSignUp.Click += new System.EventHandler(this.btnSignUp_Click);
            // 
            // textBox1
            // 
            this.textBox1.BackColor = System.Drawing.Color.Cornsilk;
            this.textBox1.Font = new System.Drawing.Font("Segoe Print", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBox1.ForeColor = System.Drawing.Color.DarkOrange;
            this.textBox1.Location = new System.Drawing.Point(17, 45);
            this.textBox1.Multiline = true;
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(347, 62);
            this.textBox1.TabIndex = 14;
            this.textBox1.Text = "Whatever comes your way, I\'m with you on your journey to reach your goal.";
            // 
            // LogInForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.Cornsilk;
            this.ClientSize = new System.Drawing.Size(398, 375);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.btnSignUp);
            this.Controls.Add(this.btnSignIn);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.txtPassword);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.txtAcct);
            this.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.Name = "LogInForm";
            this.Text = "LogInForm";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.LogInForm_FormClosing);
            this.Load += new System.EventHandler(this.LogInForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtAcct;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.Button btnSignIn;
        private System.Windows.Forms.Button btnSignUp;
        private System.Windows.Forms.TextBox textBox1;
    }
}