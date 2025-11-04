namespace WindowsFormsApp10
{
    partial class Form1
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
            this.gBFunc = new System.Windows.Forms.GroupBox();
            this.btnConnect = new System.Windows.Forms.Button();
            this.btnSearchData = new System.Windows.Forms.Button();
            this.btnUpdateData = new System.Windows.Forms.Button();
            this.btnAddData = new System.Windows.Forms.Button();
            this.btnDeleteData = new System.Windows.Forms.Button();
            this.btnClearField = new System.Windows.Forms.Button();
            this.gBDataFields = new System.Windows.Forms.GroupBox();
            this.lblId = new System.Windows.Forms.Label();
            this.lblName = new System.Windows.Forms.Label();
            this.lblTel = new System.Windows.Forms.Label();
            this.lblAddress = new System.Windows.Forms.Label();
            this.lblEmail = new System.Windows.Forms.Label();
            this.lblPoints = new System.Windows.Forms.Label();
            this.lblBirthday = new System.Windows.Forms.Label();
            this.lblMarry = new System.Windows.Forms.Label();
            this.txtId = new System.Windows.Forms.TextBox();
            this.txtName = new System.Windows.Forms.TextBox();
            this.txtTel = new System.Windows.Forms.TextBox();
            this.txtAddress = new System.Windows.Forms.TextBox();
            this.txtEmail = new System.Windows.Forms.TextBox();
            this.txtPoints = new System.Windows.Forms.TextBox();
            this.dTPickBirthday = new System.Windows.Forms.DateTimePicker();
            this.chkMarriage = new System.Windows.Forms.CheckBox();
            this.dataGridViewResult = new System.Windows.Forms.DataGridView();
            this.btnDIsplayAll = new System.Windows.Forms.Button();
            this.gBQueryResult = new System.Windows.Forms.GroupBox();
            this.gBAdvanceSearch = new System.Windows.Forms.GroupBox();
            this.gBKeyword = new System.Windows.Forms.GroupBox();
            this.comBoField = new System.Windows.Forms.ComboBox();
            this.txtSearchValue = new System.Windows.Forms.TextBox();
            this.gBBirthdayRange = new System.Windows.Forms.GroupBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.dTPickerStart = new System.Windows.Forms.DateTimePicker();
            this.dTPickerEnd = new System.Windows.Forms.DateTimePicker();
            this.btnAdvanceSearch = new System.Windows.Forms.Button();
            this.gBMarriage = new System.Windows.Forms.GroupBox();
            this.radioBMarried = new System.Windows.Forms.RadioButton();
            this.radioBSingle = new System.Windows.Forms.RadioButton();
            this.radioBBoth = new System.Windows.Forms.RadioButton();
            this.gBFunc.SuspendLayout();
            this.gBDataFields.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewResult)).BeginInit();
            this.gBQueryResult.SuspendLayout();
            this.gBAdvanceSearch.SuspendLayout();
            this.gBKeyword.SuspendLayout();
            this.gBBirthdayRange.SuspendLayout();
            this.gBMarriage.SuspendLayout();
            this.SuspendLayout();
            // 
            // gBFunc
            // 
            this.gBFunc.Controls.Add(this.btnClearField);
            this.gBFunc.Controls.Add(this.btnDeleteData);
            this.gBFunc.Controls.Add(this.btnAddData);
            this.gBFunc.Controls.Add(this.btnUpdateData);
            this.gBFunc.Controls.Add(this.btnSearchData);
            this.gBFunc.Controls.Add(this.btnConnect);
            this.gBFunc.Location = new System.Drawing.Point(30, 29);
            this.gBFunc.Name = "gBFunc";
            this.gBFunc.Size = new System.Drawing.Size(240, 206);
            this.gBFunc.TabIndex = 0;
            this.gBFunc.TabStop = false;
            this.gBFunc.Text = "功能按扭";
            // 
            // btnConnect
            // 
            this.btnConnect.Location = new System.Drawing.Point(18, 33);
            this.btnConnect.Name = "btnConnect";
            this.btnConnect.Size = new System.Drawing.Size(82, 31);
            this.btnConnect.TabIndex = 1;
            this.btnConnect.Text = "Connect";
            this.btnConnect.UseVisualStyleBackColor = true;
            this.btnConnect.Click += new System.EventHandler(this.btnConnect_Click);
            // 
            // btnSearchData
            // 
            this.btnSearchData.Location = new System.Drawing.Point(18, 76);
            this.btnSearchData.Name = "btnSearchData";
            this.btnSearchData.Size = new System.Drawing.Size(82, 31);
            this.btnSearchData.TabIndex = 2;
            this.btnSearchData.Text = "Search Data";
            this.btnSearchData.UseVisualStyleBackColor = true;
            this.btnSearchData.Click += new System.EventHandler(this.btnSearchData_Click);
            // 
            // btnUpdateData
            // 
            this.btnUpdateData.Location = new System.Drawing.Point(18, 118);
            this.btnUpdateData.Name = "btnUpdateData";
            this.btnUpdateData.Size = new System.Drawing.Size(82, 31);
            this.btnUpdateData.TabIndex = 3;
            this.btnUpdateData.Text = "Update Data";
            this.btnUpdateData.UseVisualStyleBackColor = true;
            // 
            // btnAddData
            // 
            this.btnAddData.Location = new System.Drawing.Point(18, 161);
            this.btnAddData.Name = "btnAddData";
            this.btnAddData.Size = new System.Drawing.Size(82, 31);
            this.btnAddData.TabIndex = 4;
            this.btnAddData.Text = "Add Data";
            this.btnAddData.UseVisualStyleBackColor = true;
            // 
            // btnDeleteData
            // 
            this.btnDeleteData.Location = new System.Drawing.Point(120, 33);
            this.btnDeleteData.Name = "btnDeleteData";
            this.btnDeleteData.Size = new System.Drawing.Size(82, 31);
            this.btnDeleteData.TabIndex = 5;
            this.btnDeleteData.Text = "Delete Data";
            this.btnDeleteData.UseVisualStyleBackColor = true;
            // 
            // btnClearField
            // 
            this.btnClearField.Location = new System.Drawing.Point(120, 76);
            this.btnClearField.Name = "btnClearField";
            this.btnClearField.Size = new System.Drawing.Size(82, 31);
            this.btnClearField.TabIndex = 6;
            this.btnClearField.Text = "Clear Field";
            this.btnClearField.UseVisualStyleBackColor = true;
            // 
            // gBDataFields
            // 
            this.gBDataFields.Controls.Add(this.chkMarriage);
            this.gBDataFields.Controls.Add(this.dTPickBirthday);
            this.gBDataFields.Controls.Add(this.txtPoints);
            this.gBDataFields.Controls.Add(this.txtEmail);
            this.gBDataFields.Controls.Add(this.txtAddress);
            this.gBDataFields.Controls.Add(this.txtTel);
            this.gBDataFields.Controls.Add(this.txtName);
            this.gBDataFields.Controls.Add(this.txtId);
            this.gBDataFields.Controls.Add(this.lblMarry);
            this.gBDataFields.Controls.Add(this.lblBirthday);
            this.gBDataFields.Controls.Add(this.lblPoints);
            this.gBDataFields.Controls.Add(this.lblEmail);
            this.gBDataFields.Controls.Add(this.lblAddress);
            this.gBDataFields.Controls.Add(this.lblTel);
            this.gBDataFields.Controls.Add(this.lblName);
            this.gBDataFields.Controls.Add(this.lblId);
            this.gBDataFields.Location = new System.Drawing.Point(287, 26);
            this.gBDataFields.Name = "gBDataFields";
            this.gBDataFields.Size = new System.Drawing.Size(340, 294);
            this.gBDataFields.TabIndex = 1;
            this.gBDataFields.TabStop = false;
            this.gBDataFields.Text = "資料欄位";
            // 
            // lblId
            // 
            this.lblId.AutoSize = true;
            this.lblId.Location = new System.Drawing.Point(21, 31);
            this.lblId.Name = "lblId";
            this.lblId.Size = new System.Drawing.Size(18, 16);
            this.lblId.TabIndex = 0;
            this.lblId.Text = "Id";
            // 
            // lblName
            // 
            this.lblName.AutoSize = true;
            this.lblName.Location = new System.Drawing.Point(21, 66);
            this.lblName.Name = "lblName";
            this.lblName.Size = new System.Drawing.Size(44, 16);
            this.lblName.TabIndex = 1;
            this.lblName.Text = "Name";
            // 
            // lblTel
            // 
            this.lblTel.AutoSize = true;
            this.lblTel.Location = new System.Drawing.Point(21, 101);
            this.lblTel.Name = "lblTel";
            this.lblTel.Size = new System.Drawing.Size(27, 16);
            this.lblTel.TabIndex = 2;
            this.lblTel.Text = "Tel";
            // 
            // lblAddress
            // 
            this.lblAddress.AutoSize = true;
            this.lblAddress.Location = new System.Drawing.Point(21, 133);
            this.lblAddress.Name = "lblAddress";
            this.lblAddress.Size = new System.Drawing.Size(58, 16);
            this.lblAddress.TabIndex = 3;
            this.lblAddress.Text = "Address";
            // 
            // lblEmail
            // 
            this.lblEmail.AutoSize = true;
            this.lblEmail.Location = new System.Drawing.Point(21, 164);
            this.lblEmail.Name = "lblEmail";
            this.lblEmail.Size = new System.Drawing.Size(40, 16);
            this.lblEmail.TabIndex = 4;
            this.lblEmail.Text = "eMail";
            // 
            // lblPoints
            // 
            this.lblPoints.AutoSize = true;
            this.lblPoints.Location = new System.Drawing.Point(21, 193);
            this.lblPoints.Name = "lblPoints";
            this.lblPoints.Size = new System.Drawing.Size(44, 16);
            this.lblPoints.TabIndex = 5;
            this.lblPoints.Text = "Points";
            // 
            // lblBirthday
            // 
            this.lblBirthday.AutoSize = true;
            this.lblBirthday.Location = new System.Drawing.Point(21, 223);
            this.lblBirthday.Name = "lblBirthday";
            this.lblBirthday.Size = new System.Drawing.Size(56, 16);
            this.lblBirthday.TabIndex = 6;
            this.lblBirthday.Text = "Birthday";
            // 
            // lblMarry
            // 
            this.lblMarry.AutoSize = true;
            this.lblMarry.Location = new System.Drawing.Point(21, 256);
            this.lblMarry.Name = "lblMarry";
            this.lblMarry.Size = new System.Drawing.Size(61, 16);
            this.lblMarry.TabIndex = 6;
            this.lblMarry.Text = "Marriage";
            // 
            // txtId
            // 
            this.txtId.Location = new System.Drawing.Point(100, 28);
            this.txtId.Name = "txtId";
            this.txtId.Size = new System.Drawing.Size(100, 22);
            this.txtId.TabIndex = 7;
            // 
            // txtName
            // 
            this.txtName.Location = new System.Drawing.Point(100, 66);
            this.txtName.Name = "txtName";
            this.txtName.Size = new System.Drawing.Size(100, 22);
            this.txtName.TabIndex = 8;
            // 
            // txtTel
            // 
            this.txtTel.Location = new System.Drawing.Point(100, 101);
            this.txtTel.Name = "txtTel";
            this.txtTel.Size = new System.Drawing.Size(100, 22);
            this.txtTel.TabIndex = 9;
            // 
            // txtAddress
            // 
            this.txtAddress.Location = new System.Drawing.Point(100, 133);
            this.txtAddress.Name = "txtAddress";
            this.txtAddress.Size = new System.Drawing.Size(100, 22);
            this.txtAddress.TabIndex = 10;
            // 
            // txtEmail
            // 
            this.txtEmail.Location = new System.Drawing.Point(100, 164);
            this.txtEmail.Name = "txtEmail";
            this.txtEmail.Size = new System.Drawing.Size(100, 22);
            this.txtEmail.TabIndex = 11;
            // 
            // txtPoints
            // 
            this.txtPoints.Location = new System.Drawing.Point(100, 193);
            this.txtPoints.Name = "txtPoints";
            this.txtPoints.Size = new System.Drawing.Size(100, 22);
            this.txtPoints.TabIndex = 12;
            // 
            // dTPickBirthday
            // 
            this.dTPickBirthday.Location = new System.Drawing.Point(100, 223);
            this.dTPickBirthday.Name = "dTPickBirthday";
            this.dTPickBirthday.Size = new System.Drawing.Size(200, 22);
            this.dTPickBirthday.TabIndex = 13;
            // 
            // chkMarriage
            // 
            this.chkMarriage.AutoSize = true;
            this.chkMarriage.Location = new System.Drawing.Point(100, 256);
            this.chkMarriage.Name = "chkMarriage";
            this.chkMarriage.Size = new System.Drawing.Size(95, 20);
            this.chkMarriage.TabIndex = 14;
            this.chkMarriage.Text = "checkBox1";
            this.chkMarriage.UseVisualStyleBackColor = true;
            // 
            // dataGridViewResult
            // 
            this.dataGridViewResult.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewResult.Location = new System.Drawing.Point(23, 76);
            this.dataGridViewResult.Name = "dataGridViewResult";
            this.dataGridViewResult.RowHeadersWidth = 51;
            this.dataGridViewResult.RowTemplate.Height = 24;
            this.dataGridViewResult.Size = new System.Drawing.Size(375, 146);
            this.dataGridViewResult.TabIndex = 2;
            this.dataGridViewResult.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewResult_CellClick);
            // 
            // btnDIsplayAll
            // 
            this.btnDIsplayAll.Location = new System.Drawing.Point(25, 29);
            this.btnDIsplayAll.Name = "btnDIsplayAll";
            this.btnDIsplayAll.Size = new System.Drawing.Size(184, 31);
            this.btnDIsplayAll.TabIndex = 7;
            this.btnDIsplayAll.Text = "Display All Member";
            this.btnDIsplayAll.UseVisualStyleBackColor = true;
            // 
            // gBQueryResult
            // 
            this.gBQueryResult.Controls.Add(this.btnDIsplayAll);
            this.gBQueryResult.Controls.Add(this.dataGridViewResult);
            this.gBQueryResult.Location = new System.Drawing.Point(30, 336);
            this.gBQueryResult.Name = "gBQueryResult";
            this.gBQueryResult.Size = new System.Drawing.Size(421, 241);
            this.gBQueryResult.TabIndex = 8;
            this.gBQueryResult.TabStop = false;
            this.gBQueryResult.Text = "Query Result";
            // 
            // gBAdvanceSearch
            // 
            this.gBAdvanceSearch.Controls.Add(this.gBMarriage);
            this.gBAdvanceSearch.Controls.Add(this.btnAdvanceSearch);
            this.gBAdvanceSearch.Controls.Add(this.gBBirthdayRange);
            this.gBAdvanceSearch.Controls.Add(this.gBKeyword);
            this.gBAdvanceSearch.Location = new System.Drawing.Point(472, 345);
            this.gBAdvanceSearch.Name = "gBAdvanceSearch";
            this.gBAdvanceSearch.Size = new System.Drawing.Size(453, 232);
            this.gBAdvanceSearch.TabIndex = 9;
            this.gBAdvanceSearch.TabStop = false;
            this.gBAdvanceSearch.Text = "Advance Search";
            // 
            // gBKeyword
            // 
            this.gBKeyword.Controls.Add(this.txtSearchValue);
            this.gBKeyword.Controls.Add(this.comBoField);
            this.gBKeyword.Location = new System.Drawing.Point(6, 34);
            this.gBKeyword.Name = "gBKeyword";
            this.gBKeyword.Size = new System.Drawing.Size(168, 100);
            this.gBKeyword.TabIndex = 0;
            this.gBKeyword.TabStop = false;
            this.gBKeyword.Text = "Keyword";
            // 
            // comBoField
            // 
            this.comBoField.FormattingEnabled = true;
            this.comBoField.Location = new System.Drawing.Point(16, 22);
            this.comBoField.Name = "comBoField";
            this.comBoField.Size = new System.Drawing.Size(121, 24);
            this.comBoField.TabIndex = 0;
            // 
            // txtSearchValue
            // 
            this.txtSearchValue.Location = new System.Drawing.Point(16, 63);
            this.txtSearchValue.Name = "txtSearchValue";
            this.txtSearchValue.Size = new System.Drawing.Size(121, 22);
            this.txtSearchValue.TabIndex = 15;
            // 
            // gBBirthdayRange
            // 
            this.gBBirthdayRange.Controls.Add(this.dTPickerEnd);
            this.gBBirthdayRange.Controls.Add(this.dTPickerStart);
            this.gBBirthdayRange.Controls.Add(this.label2);
            this.gBBirthdayRange.Controls.Add(this.label1);
            this.gBBirthdayRange.Location = new System.Drawing.Point(189, 34);
            this.gBBirthdayRange.Name = "gBBirthdayRange";
            this.gBBirthdayRange.Size = new System.Drawing.Size(258, 100);
            this.gBBirthdayRange.TabIndex = 1;
            this.gBBirthdayRange.TabStop = false;
            this.gBBirthdayRange.Text = "Birthday Range";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(6, 25);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(38, 16);
            this.label1.TabIndex = 5;
            this.label1.Text = "From";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(6, 52);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(24, 16);
            this.label2.TabIndex = 6;
            this.label2.Text = "To";
            // 
            // dTPickerStart
            // 
            this.dTPickerStart.Location = new System.Drawing.Point(50, 24);
            this.dTPickerStart.Name = "dTPickerStart";
            this.dTPickerStart.Size = new System.Drawing.Size(200, 22);
            this.dTPickerStart.TabIndex = 15;
            // 
            // dTPickerEnd
            // 
            this.dTPickerEnd.Location = new System.Drawing.Point(52, 52);
            this.dTPickerEnd.Name = "dTPickerEnd";
            this.dTPickerEnd.Size = new System.Drawing.Size(200, 22);
            this.dTPickerEnd.TabIndex = 16;
            // 
            // btnAdvanceSearch
            // 
            this.btnAdvanceSearch.Location = new System.Drawing.Point(315, 182);
            this.btnAdvanceSearch.Name = "btnAdvanceSearch";
            this.btnAdvanceSearch.Size = new System.Drawing.Size(126, 31);
            this.btnAdvanceSearch.TabIndex = 8;
            this.btnAdvanceSearch.Text = "Advance Search";
            this.btnAdvanceSearch.UseVisualStyleBackColor = true;
            // 
            // gBMarriage
            // 
            this.gBMarriage.Controls.Add(this.radioBBoth);
            this.gBMarriage.Controls.Add(this.radioBSingle);
            this.gBMarriage.Controls.Add(this.radioBMarried);
            this.gBMarriage.Location = new System.Drawing.Point(22, 142);
            this.gBMarriage.Name = "gBMarriage";
            this.gBMarriage.Size = new System.Drawing.Size(277, 84);
            this.gBMarriage.TabIndex = 9;
            this.gBMarriage.TabStop = false;
            this.gBMarriage.Text = "Marriage Status";
            // 
            // radioBMarried
            // 
            this.radioBMarried.AutoSize = true;
            this.radioBMarried.Location = new System.Drawing.Point(6, 40);
            this.radioBMarried.Name = "radioBMarried";
            this.radioBMarried.Size = new System.Drawing.Size(74, 20);
            this.radioBMarried.TabIndex = 0;
            this.radioBMarried.TabStop = true;
            this.radioBMarried.Text = "Married";
            this.radioBMarried.UseVisualStyleBackColor = true;
            // 
            // radioBSingle
            // 
            this.radioBSingle.AutoSize = true;
            this.radioBSingle.Location = new System.Drawing.Point(86, 40);
            this.radioBSingle.Name = "radioBSingle";
            this.radioBSingle.Size = new System.Drawing.Size(66, 20);
            this.radioBSingle.TabIndex = 1;
            this.radioBSingle.TabStop = true;
            this.radioBSingle.Text = "Single";
            this.radioBSingle.UseVisualStyleBackColor = true;
            // 
            // radioBBoth
            // 
            this.radioBBoth.AutoSize = true;
            this.radioBBoth.Location = new System.Drawing.Point(158, 40);
            this.radioBBoth.Name = "radioBBoth";
            this.radioBBoth.Size = new System.Drawing.Size(55, 20);
            this.radioBBoth.TabIndex = 2;
            this.radioBBoth.TabStop = true;
            this.radioBBoth.Text = "Both";
            this.radioBBoth.UseVisualStyleBackColor = true;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(937, 599);
            this.Controls.Add(this.gBAdvanceSearch);
            this.Controls.Add(this.gBQueryResult);
            this.Controls.Add(this.gBDataFields);
            this.Controls.Add(this.gBFunc);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.gBFunc.ResumeLayout(false);
            this.gBDataFields.ResumeLayout(false);
            this.gBDataFields.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewResult)).EndInit();
            this.gBQueryResult.ResumeLayout(false);
            this.gBAdvanceSearch.ResumeLayout(false);
            this.gBKeyword.ResumeLayout(false);
            this.gBKeyword.PerformLayout();
            this.gBBirthdayRange.ResumeLayout(false);
            this.gBBirthdayRange.PerformLayout();
            this.gBMarriage.ResumeLayout(false);
            this.gBMarriage.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox gBFunc;
        private System.Windows.Forms.Button btnAddData;
        private System.Windows.Forms.Button btnUpdateData;
        private System.Windows.Forms.Button btnSearchData;
        private System.Windows.Forms.Button btnConnect;
        private System.Windows.Forms.Button btnDeleteData;
        private System.Windows.Forms.Button btnClearField;
        private System.Windows.Forms.GroupBox gBDataFields;
        private System.Windows.Forms.Label lblEmail;
        private System.Windows.Forms.Label lblAddress;
        private System.Windows.Forms.Label lblTel;
        private System.Windows.Forms.Label lblName;
        private System.Windows.Forms.Label lblId;
        private System.Windows.Forms.Label lblPoints;
        private System.Windows.Forms.Label lblMarry;
        private System.Windows.Forms.Label lblBirthday;
        private System.Windows.Forms.CheckBox chkMarriage;
        private System.Windows.Forms.DateTimePicker dTPickBirthday;
        private System.Windows.Forms.TextBox txtPoints;
        private System.Windows.Forms.TextBox txtEmail;
        private System.Windows.Forms.TextBox txtAddress;
        private System.Windows.Forms.TextBox txtTel;
        private System.Windows.Forms.TextBox txtName;
        private System.Windows.Forms.TextBox txtId;
        private System.Windows.Forms.DataGridView dataGridViewResult;
        private System.Windows.Forms.Button btnDIsplayAll;
        private System.Windows.Forms.GroupBox gBQueryResult;
        private System.Windows.Forms.GroupBox gBAdvanceSearch;
        private System.Windows.Forms.GroupBox gBKeyword;
        private System.Windows.Forms.TextBox txtSearchValue;
        private System.Windows.Forms.ComboBox comBoField;
        private System.Windows.Forms.GroupBox gBBirthdayRange;
        private System.Windows.Forms.DateTimePicker dTPickerEnd;
        private System.Windows.Forms.DateTimePicker dTPickerStart;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.GroupBox gBMarriage;
        private System.Windows.Forms.RadioButton radioBMarried;
        private System.Windows.Forms.Button btnAdvanceSearch;
        private System.Windows.Forms.RadioButton radioBBoth;
        private System.Windows.Forms.RadioButton radioBSingle;
    }
}

