using System;
using System.Collections.Generic;

namespace Questionnaire.Models
{
    public partial class Question
    {
        public Question()
        {
            Answers = new HashSet<Answer>();
        }

        public int QuestionId { get; set; }
        public string Description { get; set; } = null!;

        public virtual ICollection<Answer> Answers { get; set; }
    }
}
