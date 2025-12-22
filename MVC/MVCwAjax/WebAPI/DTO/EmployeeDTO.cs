namespace WebAPI.DTO
{
    public class EmployeeDTO
    {
        public int EmployeeId { get; set; }

        // LastName and FirstName 屬性不可為 null, 根據資料庫設計
        public string? LastName { get; set; }
        public string? FirstName { get; set; }
        public string? Title { get; set; }


    }
}