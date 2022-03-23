using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlanMealAPI.Models;

namespace PlanMealAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComponentDetailMealDetailsController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public ComponentDetailMealDetailsController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/ComponentDetailMealDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComponentDetailMealDetail>>> GetComponentDetailMealDetail()
        {
            return await _context.ComponentDetailMealDetail.ToListAsync();
        }

        // GET: api/ComponentDetailMealDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComponentDetailMealDetail>> GetComponentDetailMealDetail(int id)
        {
            var componentDetailMealDetail = await _context.ComponentDetailMealDetail.FindAsync(id);

            if (componentDetailMealDetail == null)
            {
                return NotFound();
            }

            return componentDetailMealDetail;
        }

        // PUT: api/ComponentDetailMealDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComponentDetailMealDetail(int id, ComponentDetailMealDetail componentDetailMealDetail)
        {
            if (id != componentDetailMealDetail.ComponentId)
            {
                return BadRequest();
            }

            _context.Entry(componentDetailMealDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ComponentDetailMealDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ComponentDetailMealDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ComponentDetailMealDetail>> PostComponentDetailMealDetail(ComponentDetailMealDetail componentDetailMealDetail)
        {
            _context.ComponentDetailMealDetail.Add(componentDetailMealDetail);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ComponentDetailMealDetailExists(componentDetailMealDetail.ComponentId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetComponentDetailMealDetail", new { id = componentDetailMealDetail.ComponentId }, componentDetailMealDetail);
        }

        // DELETE: api/ComponentDetailMealDetails/5
        [HttpDelete("{id,idt}")]
        public async Task<IActionResult> DeleteComponentDetailMealDetail(int id,int idt)
        {
            var componentDetailMealDetail = await _context.ComponentDetailMealDetail.FindAsync(id,idt);
            if (componentDetailMealDetail == null)
            {
                return NotFound();
            }

            _context.ComponentDetailMealDetail.Remove(componentDetailMealDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ComponentDetailMealDetailExists(int id)
        {
            return _context.ComponentDetailMealDetail.Any(e => e.ComponentId == id);
        }
    }
}
