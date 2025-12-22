using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Questionnaire.Models;

namespace Questionnaire.Controllers
{
    public class QuestionsController : Controller
    {
        private readonly NorthwindContext _context;

        public QuestionsController(NorthwindContext context)
        {
            _context = context;
        }

        //public IActionResult GetQuestionnaire()
        //{
        //    List<Question> Questions=new List<Question>();  
        //    Question q1=new Question { Description = "Question1" };
        //    q1.Answers.Add("q1A");
        //    q1.Answers.Add("q1B");
        //    q1.Answers.Add("q1C");
        //    q1.Answers.Add("q1D");
        //    Questions.Add(q1);

        //    Question q2 = new Question { Description = "Question2" };
        //    q2.Answers.Add("q2A");
        //    q2.Answers.Add("q2B");
        //    q2.Answers.Add("q2C");
        //    q2.Answers.Add("q2D");
        //    Questions.Add(q2);

        //    return View(Questions);
        //}

        // GET: Questions
        public async Task<IActionResult> IndexSIngle()
        {
            return View(_context.Questions.Include("Answers"));
        }

        public async Task<IActionResult> IndexMultiple()
        {
            return View(_context.Questions.Include("Answers"));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Answers(IFormCollection Questions)
        {
            return View(Questions);
        }
    }
}
