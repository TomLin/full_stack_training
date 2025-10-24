namespace WindowsFormsApp5
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
            this.components = new System.ComponentModel.Container();
            this.label1 = new System.Windows.Forms.Label();
            this.btnAllProduct = new System.Windows.Forms.Button();
            this.listViewEntries = new System.Windows.Forms.ListView();
            this.btnDiscountProduct = new System.Windows.Forms.Button();
            this.btnGiftBox = new System.Windows.Forms.Button();
            this.btnPicMode = new System.Windows.Forms.Button();
            this.btnListMode = new System.Windows.Forms.Button();
            this.btnAddProduct = new System.Windows.Forms.Button();
            this.btnRefresh = new System.Windows.Forms.Button();
            this.imageListProduct = new System.Windows.Forms.ImageList(this.components);
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("微軟正黑體", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.label1.Location = new System.Drawing.Point(32, 9);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(150, 35);
            this.label1.TabIndex = 0;
            this.label1.Text = "福氣水果行";
            // 
            // btnAllProduct
            // 
            this.btnAllProduct.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnAllProduct.ForeColor = System.Drawing.Color.DarkRed;
            this.btnAllProduct.Location = new System.Drawing.Point(38, 68);
            this.btnAllProduct.Name = "btnAllProduct";
            this.btnAllProduct.Size = new System.Drawing.Size(124, 43);
            this.btnAllProduct.TabIndex = 1;
            this.btnAllProduct.Text = "全部商品";
            this.btnAllProduct.UseVisualStyleBackColor = true;
            this.btnAllProduct.Click += new System.EventHandler(this.btnAllProduct_Click);
            // 
            // listViewEntries
            // 
            this.listViewEntries.HideSelection = false;
            this.listViewEntries.Location = new System.Drawing.Point(211, 68);
            this.listViewEntries.Name = "listViewEntries";
            this.listViewEntries.Size = new System.Drawing.Size(536, 353);
            this.listViewEntries.TabIndex = 2;
            this.listViewEntries.UseCompatibleStateImageBehavior = false;
            this.listViewEntries.ItemActivate += new System.EventHandler(this.listViewEntries_ItemActivate);
            // 
            // btnDiscountProduct
            // 
            this.btnDiscountProduct.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnDiscountProduct.ForeColor = System.Drawing.Color.DarkRed;
            this.btnDiscountProduct.Location = new System.Drawing.Point(38, 117);
            this.btnDiscountProduct.Name = "btnDiscountProduct";
            this.btnDiscountProduct.Size = new System.Drawing.Size(124, 43);
            this.btnDiscountProduct.TabIndex = 3;
            this.btnDiscountProduct.Text = "特價商品";
            this.btnDiscountProduct.UseVisualStyleBackColor = true;
            this.btnDiscountProduct.Click += new System.EventHandler(this.btnDiscountProduct_Click);
            // 
            // btnGiftBox
            // 
            this.btnGiftBox.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnGiftBox.ForeColor = System.Drawing.Color.DarkRed;
            this.btnGiftBox.Location = new System.Drawing.Point(38, 166);
            this.btnGiftBox.Name = "btnGiftBox";
            this.btnGiftBox.Size = new System.Drawing.Size(124, 43);
            this.btnGiftBox.TabIndex = 4;
            this.btnGiftBox.Text = "水果禮盒";
            this.btnGiftBox.UseVisualStyleBackColor = true;
            this.btnGiftBox.Click += new System.EventHandler(this.btnGiftBox_Click);
            // 
            // btnPicMode
            // 
            this.btnPicMode.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnPicMode.ForeColor = System.Drawing.Color.Chocolate;
            this.btnPicMode.Location = new System.Drawing.Point(38, 231);
            this.btnPicMode.Name = "btnPicMode";
            this.btnPicMode.Size = new System.Drawing.Size(124, 43);
            this.btnPicMode.TabIndex = 5;
            this.btnPicMode.Text = "圖片模式";
            this.btnPicMode.UseVisualStyleBackColor = true;
            // 
            // btnListMode
            // 
            this.btnListMode.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnListMode.ForeColor = System.Drawing.Color.Chocolate;
            this.btnListMode.Location = new System.Drawing.Point(38, 280);
            this.btnListMode.Name = "btnListMode";
            this.btnListMode.Size = new System.Drawing.Size(124, 43);
            this.btnListMode.TabIndex = 6;
            this.btnListMode.Text = "列表模式";
            this.btnListMode.UseVisualStyleBackColor = true;
            // 
            // btnAddProduct
            // 
            this.btnAddProduct.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnAddProduct.ForeColor = System.Drawing.Color.Chocolate;
            this.btnAddProduct.Location = new System.Drawing.Point(38, 329);
            this.btnAddProduct.Name = "btnAddProduct";
            this.btnAddProduct.Size = new System.Drawing.Size(124, 43);
            this.btnAddProduct.TabIndex = 7;
            this.btnAddProduct.Text = "新增商品";
            this.btnAddProduct.UseVisualStyleBackColor = true;
            // 
            // btnRefresh
            // 
            this.btnRefresh.Font = new System.Drawing.Font("微軟正黑體", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(136)));
            this.btnRefresh.ForeColor = System.Drawing.Color.Chocolate;
            this.btnRefresh.Location = new System.Drawing.Point(38, 378);
            this.btnRefresh.Name = "btnRefresh";
            this.btnRefresh.Size = new System.Drawing.Size(124, 43);
            this.btnRefresh.TabIndex = 8;
            this.btnRefresh.Text = "重新載入";
            this.btnRefresh.UseVisualStyleBackColor = true;
            // 
            // imageListProduct
            // 
            this.imageListProduct.ColorDepth = System.Windows.Forms.ColorDepth.Depth32Bit;
            this.imageListProduct.ImageSize = new System.Drawing.Size(256, 256);
            this.imageListProduct.TransparentColor = System.Drawing.Color.Transparent;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.MediumAquamarine;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.btnRefresh);
            this.Controls.Add(this.btnAddProduct);
            this.Controls.Add(this.btnListMode);
            this.Controls.Add(this.btnPicMode);
            this.Controls.Add(this.btnGiftBox);
            this.Controls.Add(this.btnDiscountProduct);
            this.Controls.Add(this.listViewEntries);
            this.Controls.Add(this.btnAllProduct);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button btnAllProduct;
        private System.Windows.Forms.ListView listViewEntries;
        private System.Windows.Forms.Button btnDiscountProduct;
        private System.Windows.Forms.Button btnGiftBox;
        private System.Windows.Forms.Button btnPicMode;
        private System.Windows.Forms.Button btnListMode;
        private System.Windows.Forms.Button btnAddProduct;
        private System.Windows.Forms.Button btnRefresh;
        private System.Windows.Forms.ImageList imageListProduct;
    }
}

